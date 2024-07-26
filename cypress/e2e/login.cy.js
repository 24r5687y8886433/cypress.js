import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
          });

          afterEach('Конец теста', function () {
            cy.get('#exitMessageButton > .exitIcon').should('be.visible');
           });


    it('Верный логин и верный пароль', function () {
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
       
    })

    it('Проверка восстановления пароля', function () {
     
        cy.get('#forgotEmailButton').click(); // Нажать забыли пароль пароль

        cy.get('#mailForgot').type('german@dolnikov.ru'); // Ввели почту для восстановления
        cy.get('#restoreEmailButton').click(); // нажать отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю, на совпадение текста 
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
   })
     
    it('Верный логин и НЕверный пароль', function () {

        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio7'); // Ввели Неверный пароль
        cy.get('#loginButton').click(); // Нажал войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })
    it('НЕверный логин и верный пароль', function () {

        cy.get('#mail').type('geran@dolnikov.ru'); // Ввели НЕверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажать войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })
         
    it('Проверка валидации, в логине нет @', function () {
     
        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин без @ 
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти
        
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })
    it('Проверка на строчные буквы в логине', function () {
      
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажать войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
    })

     });
     