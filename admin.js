async function fetchLeads() {
  try {
    const response = await fetch('/api/leads');
    if (!response.ok) {
      throw new Error('Failed to load leads');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderTable(leads) {
  const body = document.getElementById('orders-body');
  const count = document.getElementById('order-count');

  if (!leads.length) {
    body.innerHTML = '<tr><td colspan="7" class="empty-state">Заявки не найдены.</td></tr>';
    count.textContent = 'Заявок: 0';
    return;
  }

  count.textContent = `Заявок: ${leads.length}`;
  body.innerHTML = leads
    .slice()
    .reverse()
    .map((lead) => {
      return `
        <tr>
          <td>${formatDate(lead.createdAt)}</td>
          <td>${lead.name || '—'}</td>
          <td>${lead.email || '—'}</td>
          <td>${lead.phone || '—'}</td>
          <td>${lead.service || '—'}</td>
          <td>${lead.project || '—'}</td>
          <td>${lead.details || '—'}</td>
        </tr>
      `;
    })
    .join('');
}

async function initAdmin() {
  const refreshButton = document.getElementById('refresh-button');
  const leads = await fetchLeads();
  renderTable(leads);

  refreshButton.addEventListener('click', async () => {
    refreshButton.disabled = true;
    refreshButton.textContent = 'Обновление...';
    const updatedLeads = await fetchLeads();
    renderTable(updatedLeads);
    refreshButton.disabled = false;
    refreshButton.textContent = 'Обновить';
  });
}

initAdmin();
