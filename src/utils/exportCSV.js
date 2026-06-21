const exportCSV = (schedule) => {
  const headers = [
    "Month",
    "EMI",
    "Principal",
    "Interest",
    "Prepayment",
    "Balance",
  ];

  const rows = schedule.map((row) => [
    row.month,
    row.emi.toFixed(2),
    row.principal.toFixed(2),
    row.interest.toFixed(2),
    0,
    row.balance.toFixed(2),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "amortization_schedule.csv";
  link.click();

  URL.revokeObjectURL(url);
};

export default exportCSV;
