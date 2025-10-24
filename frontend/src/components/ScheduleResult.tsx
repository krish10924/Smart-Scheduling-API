import React from "react";

interface ScheduleResultProps {
  recommendedOrder: string[];
}

const ScheduleResult: React.FC<ScheduleResultProps> = ({
  recommendedOrder,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Recommended Order:</h2>
      <ol className="list-decimal ml-6 space-y-1">
        {recommendedOrder.map((task, idx) => (
          <li key={idx} className="text-gray-700">
            {task}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ScheduleResult;
