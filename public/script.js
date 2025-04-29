document.getElementById('checklistForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const attendant = document.getElementById('attendant').value.trim();
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    const items = Array.from(checkboxes).map(cb => cb.value);

    if (!attendant) {
        alert('Por favor, preencha o nome do atendente.');
        return;
    }

    if (items.length === 0) {
        alert('Por favor, selecione pelo menos um item.');
        return;
    }

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attendant, items })
        });

        const message = await response.text();
        alert(message);
        document.getElementById('checklistForm').reset();
    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Erro ao enviar a demanda.');
    }
});
