export function validateCPF(cpf: string) {
  const plannedCpf = cpf.replace(/[^\d]+/g, '');
  if (plannedCpf.length !== 11 || /^(.)\1+$/.test(plannedCpf)) return false;

  var sum = 0;
  for (var i = 0; i < 9; i++) sum += parseInt(plannedCpf.charAt(i)) * (10 - i);

  var remainder = sum % 11;
  var firstDigit = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(plannedCpf.charAt(9)) !== firstDigit) return false;

  sum = 0;
  for (var i = 0; i < 10; i++) sum += parseInt(plannedCpf.charAt(i)) * (11 - i);

  remainder = sum % 11;
  var secondDigit = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(plannedCpf.charAt(10)) === secondDigit;
}