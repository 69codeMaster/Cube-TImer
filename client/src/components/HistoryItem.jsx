export default function HistoryItem({ solve_id, time, average }) {
  return (
    <div key={solve_id}>
      {time}, {average}
    </div>
  );
}
