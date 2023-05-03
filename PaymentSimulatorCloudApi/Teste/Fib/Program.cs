using System;
class Program {
    static void Main() {
        int num, previous = 0, current = 1, next;
        bool isSequence = false;

        // Pede ao usuário para digitar um número
        Console.Write("Digite um número inteiro: ");
        num = int.Parse(Console.ReadLine());

        // Verifica se o número faz parte da sequência
        for (int i = 1; i <= num; i++) {
            if (i == previous + current) {
                isSequence = true;
                break;
            }
            next = previous + current;
            previous = current;
            current = next;
        }

        // Exibe a sequência e se o número faz parte dela
        Console.Write($"Sequência de Fibonacci até {num}: 0 1 ");
        for (int i = 2; i <= num; i++) {
            next = previous + current;
            previous = current;
            current = next;
            Console.Write($"{current} ");
        }
        Console.WriteLine();
        Console.WriteLine($"O número {num} {(isSequence ? "faz" : "não faz")} parte da sequência de Fibonacci.");
    }
}
