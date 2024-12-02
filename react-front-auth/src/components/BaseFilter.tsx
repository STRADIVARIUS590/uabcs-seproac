import { useContext } from "react";
import { R } from "./Courses"; // Ensure R is your context

interface FilterProps {
  users: { id: string | number; name: string }[];
}

export const BaseFilter = ({ users }: FilterProps) => {

  const { userIds, setUserIds } = useContext(R);

  const handleCheckboxChange = (id: string | number, checked: boolean) => {
    if (checked) {
      setUserIds(prevUserIds => [...prevUserIds, id]);
    } else {
      setUserIds(prevUserIds => prevUserIds.filter(userId => userId !== id));
    }
  };

  return (
    <div>
      {users.map(user => (
        <span key={user.id}>
          <label>
            <input
              type="checkbox"
              checked={userIds.includes(user.id)}
              onChange={e => handleCheckboxChange(user.id, e.target.checked)}
            />
            {user.name}
          </label>
        </span  >
      ))}
    </div>
  );
};
