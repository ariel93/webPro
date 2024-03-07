document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sort-select');
    const dataContainer = document.getElementById('data-container');
    const cartButton = document.getElementById('cart-button');
    const productModal = document.getElementById('product-modal');
    const productDetailsContainer = document.getElementById('product-details');
    const modalCloseButton = document.querySelector('.close');
    const cart = [];

    function sortProducts(products, sortBy) {
        switch (sortBy) {
            case 'name':
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case 'category':
                return products.sort((a, b) => a.category.localeCompare(b.category));
            case 'price':
                return products.sort((a, b) => a.price - b.price);
            default:
                return products;
        }
    }

    function addToCart(product) {
        cart.push(product);
        console.log(`Product "${product.title}" added to the cart.`);
    }

    function openProductModal(product) {
        // Fill in the product details in the modal
        productDetailsContainer.innerHTML = `       
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="buy-button" onclick="addToCartInModal('${product.title}')">Add to Cart</button>
        `;

        // Show the modal
        productModal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    function renderProducts(products) {
        dataContainer.innerHTML = '';

        products.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const imageElement = document.createElement('img');
            imageElement.src = product.image;
            imageElement.alt = product.title;

            const productInfoDiv = document.createElement('div');
            productInfoDiv.classList.add('product-info');

            const titleElement = document.createElement('p');
            titleElement.classList.add('product-title');
            titleElement.textContent = product.title;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('product-description');
            descriptionElement.textContent = product.description;

            const priceElement = document.createElement('p');
            priceElement.classList.add('product-price');
            priceElement.textContent = `Price: $${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('buy-button');
            addToCartButton.textContent = 'Add to Cart';

            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.classList.add('buy-button');
            viewDetailsButton.textContent = 'Details...';

            addToCartButton.addEventListener('click', () => {
                addToCart(product);
            });

            viewDetailsButton.addEventListener('click', () => {
                openProductModal(product);
            });

            productInfoDiv.appendChild(titleElement);
            // productInfoDiv.appendChild(descriptionElement);
            productInfoDiv.appendChild(priceElement);
            // productInfoDiv.appendChild(imageElement)

            cardDiv.appendChild(imageElement);
            cardDiv.appendChild(productInfoDiv);
            cardDiv.appendChild(addToCartButton);
            cardDiv.appendChild(viewDetailsButton);

            dataContainer.appendChild(cardDiv);
        });
    }

    function addToCartInModal(productTitle) {
        const product = cart.find(item => item.title === productTitle);
        if (product) {
            addToCart(product);
        }
    }

    function openCartModal() {
        const cartModal = document.createElement('div');
        cartModal.classList.add('modal-content');
    
        const cartList = document.createElement('ul');
        let totalPrice = 0;
    
        cart.forEach((product, index) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${product.title} - $${product.price}`;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                // Remove the product from the cart
                cart.splice(index, 1);
                // Update the cart modal
                openCartModal();
            });
    
            cartItem.appendChild(deleteButton);
            cartList.appendChild(cartItem);
    
            // Sum up the prices of products
            totalPrice += product.price;
        });
    
        const totalQuantity = cart.length;
    
        const summaryInfo = document.createElement('p');
        summaryInfo.textContent = `Total Products: ${totalQuantity}, Total Price: $${totalPrice.toFixed(2)}`;
    
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.addEventListener('click', () => {
            console.log('Purchase confirmation:', cart);
            // Your code for handling purchase confirmation
        });
    
        cartModal.appendChild(cartList);
        cartModal.appendChild(summaryInfo);
        cartModal.appendChild(confirmButton);
    
        // Show the cart modal
        productDetailsContainer.innerHTML = '';
        productDetailsContainer.appendChild(cartModal);
        productModal.style.display = 'block';
        document.body.classList.add('modal-open');
    }
       

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            let sortedProducts = sortProducts(json, sortSelect.value);

            sortSelect.addEventListener('change', function () {
                sortedProducts = sortProducts(json, sortSelect.value);
                renderProducts(sortedProducts);
            });

            cartButton.addEventListener('click', function () {
                openCartModal();
            });

            modalCloseButton.addEventListener('click', function () {
                // Close the modal
                productModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            });

            renderProducts(sortedProducts);
        })
        .catch(error => console.error('Data error:', error));
});


