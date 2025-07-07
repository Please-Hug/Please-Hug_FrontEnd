# Node.js 20 기반 이미지 사용 (Alpine 대신 일반 Linux 사용)
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package.json ./

# 기존 lock 파일 제거 및 캐시 정리
RUN rm -rf package-lock.json node_modules
RUN npm cache clean --force

# 의존성 새로 설치
RUN npm install

# 소스 코드 복사
COPY . .

# Vite 개발 서버 포트 노출
EXPOSE 5173

# 개발 서버 실행
CMD ["npm", "run", "dev"] 