import generator from 'generate-password';

export default function generateRandomPassword(length = 8) {
  return generator.generate({
    length,
    numbers: true,
  });
}
