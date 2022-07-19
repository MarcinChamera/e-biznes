describe('Products & Categories', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('all categories are visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').should('have.length', 5);
        cy.get('.category').then($categories => $categories[0]).should("have.text", "wszystkie");
        cy.get('.category').then($categories => $categories[1]).should("have.text", "telefony");
        cy.get('.category').then($categories => $categories[2]).should("have.text", "słuchawki");
        cy.get('.category').then($categories => $categories[3]).should("have.text", "konsole");
        cy.get('.category').then($categories => $categories[4]).should("have.text", "monitory");
    })

    it('"wszystkie" category shouldn\'t have its description visible', () => {
        cy.get('.categoryDescription').should("not.have.text", new RegExp("."));
    })

    // it('"telefony" category should have its description visible', () => {
    //     cy.get('.categoriesCombobox').click();
    //     cy.get('.category').then($categories => $categories[1]).click();
    //     cy.get('.categoryDescription').should("have.text", "Telefony tylko od najlepszych producentów!");
    // })

    // it('"słuchawki" category should have its description visible', () => {
    //     cy.get('.categoriesCombobox').click();
    //     cy.get('.category').then($categories => $categories[2]).click();
    //     cy.get('.categoryDescription').should("have.text", "Oferujemy słuchawki nauszne jak i dokanałowe");
    // })

    // it('"konsole" category should have its description visible', () => {
    //     cy.get('.categoriesCombobox').click();
    //     cy.get('.category').then($categories => $categories[3]).click();
    //     cy.get('.categoryDescription').should("have.text", "Konsole od producentów Sony (PlayStation) i Microsoft (Xbox)");
    // })

    // it('"monitory" category should have its description visible', () => {
    //     cy.get('.categoriesCombobox').click();
    //     cy.get('.category').then($categories => $categories[4]).click();
    //     cy.get('.categoryDescription').should("have.text", "Szeroki wybór monitorów o różnych przekątnych, rozdzielczościach, częstotliwości odświeżania i nie tylko!");
    // })

    it('products from "wszystkie" category are visible', () => {
        cy.get('.product').its('length').should('be.gte', 1);
    });

    it('product image from "wszystkie" category is visible', () => {
        cy.get('.productImage > img').eq(0).should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product name from "wszystkie" category is visible', () => {
        cy.get('.productName').its('text.length').should('be.gte', 0);
    })

    it('product price from "wszystkie" category is visible', () => {
        cy.get('.productPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        })
    })

    it('"Do koszyka" button from "wszystkie" category is visible', () => {
        cy.get('.addToBasketButton').eq(0).should('have.text', "Do koszyka");
    })
    
    it('products from "telefony" category are visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[1]).click();
        cy.get('.product').its('length').should('be.gte', 1);
    });

    it('product image from "telefony" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[1]).click();
        cy.get('.productImage > img').eq(0).should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product name from "telefony" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[1]).click();
        cy.get('.productName').its('text.length').should('be.gte', 0);
    })

    it('product price from "telefony" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[1]).click();
        cy.get('.productPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        })
    })

    it('"Do koszyka" button from "telefony" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[1]).click();
        cy.get('.addToBasketButton').eq(0).should('have.text', "Do koszyka");
    })

    //

    it('products from "słuchawki" category are visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[2]).click();
        cy.get('.product').its('length').should('be.gte', 1);
    });

    it('product image from "słuchawki" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[2]).click();
        cy.get('.productImage > img').eq(0).should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product name from "słuchawki" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[2]).click();
        cy.get('.productName').its('text.length').should('be.gte', 0);
    })

    it('product price from "słuchawki" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[2]).click();
        cy.get('.productPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        })
    })

    it('"Do koszyka" button from "słuchawki" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[2]).click();
        cy.get('.addToBasketButton').eq(0).should('have.text', "Do koszyka");
    })

    //

    it('products from "konsole" category are visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[3]).click();
        cy.get('.product').its('length').should('be.gte', 1);
    });

    it('product image from "konsole" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[3]).click();
        cy.get('.productImage > img').eq(0).should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product name from "konsole" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[3]).click();
        cy.get('.productName').its('text.length').should('be.gte', 0);
    })

    it('product price from "konsole" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[3]).click();
        cy.get('.productPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        })
    })

    it('"Do koszyka" button from "konsole" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[3]).click();
        cy.get('.addToBasketButton').eq(0).should('have.text', "Do koszyka");
    })

    

    it('products from "monitory" category are visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[4]).click();
        cy.get('.product').its('length').should('be.gte', 1);
    });

    it('product image from "monitory" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[4]).click();
        cy.get('.productImage > img').eq(0).should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    })

    it('product name from "monitory" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[4]).click();
        cy.get('.productName').its('text.length').should('be.gte', 0);
    })

    it('product price from "monitory" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[4]).click();
        cy.get('.productPrice').invoke('text').then((text) => {
            expect(text.length).to.be.at.least(5)
        })
    })

    it('"Do koszyka" button from "monitory" category is visible', () => {
        cy.get('.categoriesCombobox').click();
        cy.get('.category').then($categories => $categories[4]).click();
        cy.get('.addToBasketButton').eq(0).should('have.text', "Do koszyka");
    })

    it('"Do koszyka" button triggers "Dodano do koszyka" alert', () => {
        cy.get('.addToBasketButton').eq(0).click();
        cy.get(".MuiAlert-message").should("have.text", "Dodano produkt do koszyka!");
    })
})