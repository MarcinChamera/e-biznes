describe('Products & Categories', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        sessionStorage.clear();
        cy.reload();
    })

    it('initially, shopping cart is empty', () => {
        cy.get('.cartButton').click();
        cy.get('.shoppingCartHeader').should('have.text', "W koszyku:");
        cy.get('.emptyShoppingCart').should('have.text', 'Koszyk jest pusty');
        cy.get('.shoppingCartProduct').should('not.exist');
    })

    it('products added to shopping cart are visible', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartHeader').should('have.text', "W koszyku:");
        cy.get('.shoppingCartProduct').should('exist');
    })

    it('product in shopping cart has visible image', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartProductImage > img').should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product in shopping cart has product name visible', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartProductName').its('text.length').should('be.gte', 0);
    })

    it('product in shopping cart has product price visible', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartProductPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        });
    })

    it('product in shopping cart has product quantity visible', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartProductQuantity > div > input').should('exist').invoke('attr', 'value').should('eq', '1');
    })

    it('product in shopping cart has "Usuń z koszyka" button visible', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.removeFromCartButton').should('have.text', "Usuń z koszyka");
    })

    it('product in shopping cart has displayed the amount of money to pay', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartSummary').contains(new RegExp("Do zapłacenia: "));
        cy.get('.shoppingCartSummary').contains(new RegExp("PLN"));
        cy.get('.shoppingCartSummary').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(20)
        });
    })

    it('product in shopping cart has "Idź do dostawy button displayed"', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.goToDeliveryButton').should('have.text', "Idź do dostawy");
    })

    it('quantity is reflected in total amount to pay', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get('.cartButton').click();
        cy.get('.shoppingCartProductQuantity > div > input').should('exist').invoke('attr', 'value').should('eq', '1');
        cy.get('.shoppingCartProductPrice').then(($productPrice) => {
            cy.get('.shoppingCartSummary').should('have.text', 'Do zapłacenia: ' + $productPrice.text());
        })
    })

    // it('quantity change is reflected in total amount to pay', () => {
    //     cy.get('.addToBasketButton').eq(0).click();
    //     cy.get('.cartButton').click();
    //     cy.get('.shoppingCartProductQuantity > div > input').focus().clear();
    //     const quantity = 2;
    //     cy.get('.shoppingCartProductQuantity > div > input').type(quantity.toString());
    //     cy.get('.shoppingCartProductPrice').then(($productPrice) => {
    //         const productPriceInt = parseInt($productPrice.text().split(' ')[0]);
    //         const desiredTotalPrice = (quantity * productPriceInt).toString();
    //         cy.get('.shoppingCartSummary').should('have.text', 'Do zapłacenia: ' + desiredTotalPrice + ' PLN');
    //     })
    // })
})