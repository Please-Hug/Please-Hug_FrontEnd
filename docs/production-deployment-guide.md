# React/Vite 프로덕션 배포 문제 해결 가이드

## 🐛 발견된 버그
프로덕션 환경(hugexp.xyz)에서 다음과 같은 오류 발생:
```
GET http://hugexp.xyz/src/routes/user.routes.jsx
NS_ERROR_CORRUPTED_CONTENT
Status: 500 Internal Server Error
허용되지 않는 MIME 형식("")이어서 모듈 로드가 차단되었습니다.
```

## 🔍 문제 분석

### 1. 근본 원인
- **개발 서버가 프로덕션에서 실행 중**: Dockerfile이 `npm run dev`로 개발 서버 실행
- **소스 파일 직접 요청**: 브라우저가 `.jsx` 파일을 직접 요청
- **MIME 타입 불일치**: 서버가 JavaScript 모듈이 아닌 형식으로 응답

### 2. 왜 이런 문제가 발생했나?
```javascript
// 개발 환경에서는 정상 작동
<script type="module" src="/src/main.jsx"></script>

// 하지만 프로덕션에서는 빌드된 파일을 사용해야 함
<script type="module" src="/assets/index-[hash].js"></script>
```

## 🛠️ 해결 방법

### 1. 프로덕션용 Dockerfile 생성
```dockerfile
# 빌드 단계
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  # devDependencies 포함 (빌드 도구 필요)
COPY . .
RUN npm run build

# 실행 단계 - nginx로 정적 파일 서빙
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Nginx 설정 (SPA 라우팅)
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    
    # SPA 라우팅 - 모든 경로를 index.html로
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 소스 파일 접근 차단
    location ~ \.(jsx?|tsx?)$ {
        deny all;
        return 404;
    }
}
```

### 3. Vite 프로덕션 최적화
```javascript
export default defineConfig({
  build: {
    sourcemap: false,  // 프로덕션에서 소스맵 비활성화
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          editor: ["@uiw/react-md-editor"]
        }
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true  // console.log 제거
      }
    }
  }
});
```

### 4. 환경별 Docker Compose 분리
```yaml
# docker-compose.yml (개발용)
services:
  frontend:
    build:
      dockerfile: Dockerfile.dev
    command: npm run dev

# docker-compose.prod.yml (프로덕션용)
services:
  frontend:
    build:
      dockerfile: Dockerfile
    ports:
      - "80:80"
```

## 📚 핵심 개념 이해

### 1. 개발 vs 프로덕션 서버
- **개발 서버**: HMR, 소스맵, 실시간 변경사항 반영
- **프로덕션 서버**: 최적화된 정적 파일, 캐싱, 압축

### 2. 빌드 프로세스
```
소스 코드(.jsx) → 번들링 → 최적화 → 정적 파일(.js)
```

### 3. MIME 타입
- `.jsx` 파일은 브라우저가 직접 실행할 수 없음
- 빌드 과정에서 표준 JavaScript로 변환 필요

## 🎯 배운 점

### 1. 환경 분리의 중요성
- 개발과 프로덕션은 다른 요구사항을 가짐
- 각 환경에 맞는 최적화 필요

### 2. 빌드 도구의 역할
- Vite는 개발 편의성과 프로덕션 최적화를 모두 제공
- 적절한 설정으로 성능 향상 가능

### 3. 컨테이너화 베스트 프랙티스
- 멀티 스테이지 빌드로 이미지 크기 최소화
- 환경별 Dockerfile 분리로 유연성 확보

## 💡 추가 개선 사항

1. **CI/CD 파이프라인 구축**
   ```yaml
   - npm run build
   - npm run test
   - docker build -t app:latest .
   ```

2. **환경 변수 관리**
   ```javascript
   // .env.production
   VITE_API_URL=https://api.hugexp.xyz
   ```

3. **모니터링 추가**
   - 빌드 크기 추적
   - 로딩 성능 측정
   - 에러 로깅

## 🚀 배포 명령어

### 개발 환경
```bash
# 개발 서버 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

### 프로덕션 환경
```bash
# 프로덕션 빌드 및 실행
docker-compose -f docker-compose.prod.yml up -d

# 상태 확인
docker-compose -f docker-compose.prod.yml ps
```

## 🔧 트러블슈팅

### 1. 빌드 실패 시
- `npm ci` 실행 확인
- Node 버전 확인 (v20 이상)
- terser 패키지 설치 여부 확인

### 2. MIME 타입 에러 지속 시
- nginx 설정 확인
- 빌드된 dist 폴더 존재 확인
- 브라우저 캐시 삭제

### 3. 라우팅 문제 발생 시
- nginx의 try_files 설정 확인
- React Router 설정 검토

이러한 접근 방식을 통해 안정적이고 성능 좋은 프로덕션 배포를 구현할 수 있습니다.