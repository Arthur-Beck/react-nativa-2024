/* export function formatCurrencyBRL(value) {
    if (typeof value !== 'number') {
      console.error('Valor inválido para formatar como moeda:', value);
      return 'Valor inválido';
    }
  
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  } */

    export function formatCurrencyBRL(value) {
        return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
         });
         }  
     