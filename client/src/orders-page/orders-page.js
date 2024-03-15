// get the user from the local storage 
//use the get all orders rout , send the user to the end point (rout)
//display the result to the page 

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:4000/orders/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при получении данных. Статус: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Данные о заказах:', data);
      displayOrders(data);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
});

function displayOrders(orders) {
  const orderList = document.getElementById('orderList');
  
  orders.forEach(order => {
    const orderItem = document.createElement('li');
    orderItem.innerHTML = `
      <strong>Order ID:</strong> ${order._id}<br>
      <strong>Total:</strong> ${order.total}<br>
      <strong>Items:</strong><br>
    `;
    
    const itemList = document.createElement('ul');
    order.items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Title:</strong> ${item.title}<br>
        <strong>Price:</strong> ${item.price}<br>
      `;
      itemList.appendChild(listItem);
    });
    
    orderItem.appendChild(itemList);
    orderList.appendChild(orderItem);
  });
}
