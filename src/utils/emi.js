function calculateEMI(amount, rate, tenure) {
  const monthlyrate = rate / 12 / 100;

  const emi =
    (amount *
      monthlyrate *
      Math.pow(1 + monthlyrate, tenure)) /
    (Math.pow(1 + monthlyrate, tenure) - 1);
  return emi;
}

export default calculateEMI;