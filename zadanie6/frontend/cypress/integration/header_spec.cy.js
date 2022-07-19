describe('Products', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        sessionStorage.clear();
        cy.reload();
    })

    it('shop name is visible', () => {
        cy.get('.shopName').should("have.text", "Nameless Shop");
    })

    it('cart button is visible', () => {
        cy.get('.cartButton').should("be.visible");
    })

    it('login is visible - not logged in', () => {
        cy.get('.loginLink').should("have.text", "Login");
    })

    it('logout is not visible - not logged in', () => {
        cy.get('.logoutLink').should("not.exist");
    })

    it('logout is not visible - logged in', () => {
        sessionStorage.setItem("token", "randomTokenValue");
        cy.reload();
        cy.get('.logoutLink').should("have.text", "Logout");
        cy.get('.emailLoggedIn').contains(new RegExp("Konto:")).contains(new RegExp("serwis:")).should('be.visible');
    })

    it('login is not visible - logged in', () => {
        sessionStorage.setItem("token", "randomTokenValue");
        cy.reload();
        cy.get('.loginLink').should("not.exist");
    })

    it('account email and oauth service are visible - logged in', () => {
        sessionStorage.setItem("token", "randomTokenValue");
        cy.reload();
        cy.get('.emailLoggedIn').contains(new RegExp("Konto:")).contains(new RegExp("serwis:")).should('be.visible');
    })

    it('shopping cart icon navigates to shopping-cart url', () => {
        cy.get('.cartButton').click();
        cy.get('.shoppingCartHeader').should('be.visible');
    })

    it('login changes to logout after token is provided', () => {
        cy.get('.loginLink').should("have.text", "Login");
        sessionStorage.setItem("token", "randomTokenValue");
        cy.reload();
        cy.get('.logoutLink').should("have.text", "Logout");
    })

    // it('logout changes to login after token is removed', () => {
    //     sessionStorage.clear();
    //     cy.reload();
    //     sessionStorage.setItem("token", "randomTokenValue");
    //     cy.reload();
    //     // cy.get('.logoutLink').should("have.text", "Logout");
    //     sessionStorage.removeItem("token");
    //     cy.reload();
    //     cy.get('.loginLink').should("have.text", "Login");
    // })
})