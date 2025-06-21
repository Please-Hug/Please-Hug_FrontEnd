import { FaCaretRight, FaCodeBranch } from "react-icons/fa6";
import emptyUserProfile from "../../assets/images/user/empty-user-profile.svg";

function LearningPlanItem({ title, branchCount, manager, statusLabel }) {
  return (
    <li>
      <FaCaretRight />
      <span>{title}</span>
      <div>
        <span>
          <FaCodeBranch /> <span>{branchCount}</span>
        </span>
      </div>
      <div>
        <span>{manager}</span>
      </div>
      <span>{statusLabel}</span>
      <img src={emptyUserProfile} alt={manager} />
    </li>
  );
}

export default LearningPlanItem;
