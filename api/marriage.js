export default function handler(req, res) {
  const { day, month, year } = req.query;

  if (!day || !month || !year) {
    res.status(400).json({
      status: false,
      message: "day, month, year প্রয়োজন",
      developer: "@mrsiro2.0"
    });
    return;
  }

  const weddingDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();

  // বছর, মাস, দিন হিসাব
  let years = today.getFullYear() - weddingDate.getFullYear();
  let months = today.getMonth() - weddingDate.getMonth();
  let days = today.getDate() - weddingDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today - weddingDate) / (1000 * 60 * 60 * 24));

  res.status(200).json({
    status: true,
    wedding_date: `${day}-${month}-${year}`,
    today: today.toISOString().split("T")[0],
    total_days: totalDays,
    years: years,
    months: months,
    days: days,
    developer: "@mrsiro2.0"
  });
}
