import * as order from '../../fixtures/order.json';


const API_URL = 'https://norma.nomoreparties.space/api';



describe('Тесты', () => {
    const MODAL = '[data-cy=modal]';
    const TOP = '[data-cy=ingredient_top]';
    const BOTTOM = '[data-cy=ingredient_bottom]';
    const MIDDLE = '[data-cy=ingredient_middle]';
    
    beforeEach(() => {
        
        cy.intercept("GET", `${API_URL}/ingredients`, { fixture: "ingredients.json" }).as('getIngredients');
        cy.visit('/');
        cy.get('[data-cy=ingredients]').as('ingredients');
        cy.get('[data-cy=burger_constructor]').as('constructor');
        cy.get('[data-cy=burger_element_top]').as('elementTop');
        cy.get('[data-cy=burger_element_bottom]').as('elementBottom');
        cy.get('[data-cy=burger_element_middle]').as('elementMiddle');
    });

    afterEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
      });

    describe('Тест оформление заказа', () => {
        beforeEach(() => {
            cy.setCookie('accessToken', 'AccessToken');
            localStorage.setItem('refreshToken', 'RefreshToken');

            cy.intercept("GET", `${API_URL}/auth/user`, { fixture: "login.json" }).as('auth');
            cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' }).as('order');

        });

        it('[#1] Оформление заказа', () => {
            cy.wait('@auth');
            cy.get('@ingredients').first().find('button').click({force: true});
            cy.get('@ingredients').eq(1).find('button').click({force: true});
            cy.get('@ingredients').last().find('button').click({force: true});

            cy.get('@constructor').find('button').contains('Оформить заказ').click({force: true});
            cy.wait('@order');
            cy.get('[data-cy=modal]').children().should('have.length', 2);

            cy.get('[data-cy=modal] h2:first-of-type').should(
                'have.text',
                order.order.number
              );

            cy.get('[data-cy=modal]').find('button').click({force: false})
            cy.get('[data-cy=modal]').should('not.exist');

            // После оформления заказа конструктор пуст
            cy.get('[data-cy=burger_element_top]').should('contain', "Выберите булки");
            cy.get('[data-cy=burger_element_bottom]').should('contain', "Выберите булки");
            cy.get('[data-cy=burger_element_middle]').should('contain', "Выберите начинку");

            });
        });

        describe('Проверка моковых данных', () => {
            it('[#1] Моковые данные эндпоинта api/ingredients', () => {
                cy.wait('@getIngredients').then(interception => {
                    expect(interception.response?.body).to.have.property('success');
                    expect(interception.response?.body).property('success').to.true;
                    expect(interception.response?.body).to.have.property('data');
                    expect(interception.response?.body).property('data').length(3);
                })
            });
    
            it('[#2] Рендер моковых данных', () => {
                cy.get('@ingredients').should('have.length', 3);
                cy.get('@ingredients').first().should('contain', "Флюоресцентная булка R2-D3");
                cy.get('@ingredients').last().should('contain', "Соус Spicy-X");
                cy.get('@ingredients').eq(1).should('contain', "Биокотлета из марсианской Магнолии");
            });
        });
    
        describe('Тест модального окна ингридиента', () => {
            it('[#1] Модальное окно закрыто', () => {
                cy.get(MODAL).should('not.exist');
            });
        
            it('[#2] Открытие модального окна по клике', () => {
                cy.get('@ingredients').first().find('a').click({force: true});
                cy.get(MODAL).should('exist');
            });
        
            it('[#3] Закрытие модального окна по клику на иконку', () => {
                cy.get('@ingredients').first().find('a').click({force: true});
                cy.get(MODAL).find('button').click({force: true}).go(-1);
                cy.get(MODAL).should('not.exist');
            });
        
            it('[#4] Закрытие модального окна по клику на оверлею', () => {
                cy.get('@ingredients').first().find('a').click({force: true});
                cy.get('#modals').click({force: true}).go(-1);
                cy.get(MODAL).should('not.exist');
            });
        
            it('[#5] Закрытие модального окна при нажатии на Esc', () => {
                cy.get('@ingredients').first().find('a').click({force: true});
                cy.get('body').trigger('keydown', {key: 'Escape'}).go(-1)
                cy.get(MODAL).should('not.exist');
            });
        
            it('[#6] Модальное окно открыто при перезагрузки', () => {
                cy.get('@ingredients').first().find('a').click({force: true});
                cy.reload();
                cy.get(MODAL).should('exist');
            });
        });
    
        describe('Тест конструктора бургера', () => {

            it('[#1] Проверка пустоты конструктора бургера', () => {
                cy.get('@constructor').should('exist');
                cy.get('@elementTop').should('contain', "Выберите булки");
                cy.get('@elementBottom').should('contain', "Выберите булки");
                cy.get('@elementMiddle').should('contain', "Выберите начинку");
            });
    
            it('[#2] Добавление верхнего ингридента в конструктор', () => {
                cy.get('@ingredients').first().find('button').click({force: true});
                cy.get(TOP).should('contain', 'Флюоресцентная булка R2-D3 (верх)');
            });
    
            it('[#3] Добавление нижнего ингридента в конструктор', () => {
                cy.get('@ingredients').first().find('button').click({force: true});
                cy.get(BOTTOM).should('contain', 'Флюоресцентная булка R2-D3 (низ)');
            });
        
            it('[#4] Добавление одной начинки в конструктор', () => {
                cy.get('@ingredients').eq(1).find('button').click({force: true});
                cy.get(MIDDLE + ' > li').should('have.length', 1);
            });
    
            it('[#5] Добавление двух начинок в конструктор', () => {
                cy.get('@ingredients').eq(1).find('button').click({force: true});
                cy.get('@ingredients').eq(1).find('button').click({force: true});
                cy.get(MIDDLE + ' > li').should('have.length', 2);
            });
    
            it('[#6] Кнопки перемещения начинок бургера', () => {
                cy.get('@ingredients').eq(1).find('button').click({force: true});
                cy.get('@ingredients').eq(1).find('button').click({force: true});
                cy.get(MIDDLE + ' > li').first().find('button').first().should('be.disabled');
                cy.get(MIDDLE + ' > li').first().find('button').last().should('not.be.disabled');
            });
        });

    })


