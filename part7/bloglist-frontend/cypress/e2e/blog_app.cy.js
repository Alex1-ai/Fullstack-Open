describe("Blog app", function() {

    beforeEach(function(){
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        // cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
        const user = {
            name: "alex",
            username:"alex",
            password:"alex"

        }
        // const user2 = {
        //     name:"chidix",
        //     username:"chidix",
        //     pasword:"chidix"
        // }
        // cy.request("POST", "http://localhost:3003/api/users/",user)
        // cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2)
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
       
        // cy.visit("http://localhost:3000")
        cy.visit("")
    })
    it("login form is shown", function() {
    // cy.visit('https://example.cypress.io')
        // cy.visit("http://localhost:3000")
        cy.visit("")
        cy.contains("Log in to application")
        cy.contains("password")
        cy.contains("username")
    })


    describe("login", function() {
        it("succeeds with correct credentials", function() {
            cy.contains("Log in to application")
            cy.get("#username").type("alex")
            cy.get("#password").type("alex")
            cy.get("#login-button").click()

            // cy.contains('blogs')

        })

        it("fails with wrong credentials", function (){
            cy.contains("Log in to application")
            cy.get("#username").type("alex")
            cy.get("#password").type("chinasa")
            cy.get("#login-button").click()

            cy.contains("Log in to application")
            cy.contains("Wrong username or password")

        })
    })


    describe("when logged in", function(){
        beforeEach(function(){
            const user = {
                name: "chidi",
                username:"chidi",
                password:"chidi"

            }
            // const user2 = {
            //     name:"chidix",
            //     username:"chidix",
            //     pasword:"chidix"
            // }
            // cy.request("POST", "http://localhost:3003/api/users/",user)
            // cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2)
            cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
       
            // cy.visit("http://localhost:3000")
            cy.visit("")
            
            cy.contains("Log in to application")
            cy.get("#username").type("alex")
            cy.get("#password").type("alex")
            cy.get("#login-button").click()

            // cy.contains("blogs")

        })

        it("A blog can be created", function(){
            cy.contains("blogs")
            cy.get("#blog-button").click()
            cy.contains("title")
            cy.contains("author")
            cy.contains("url")
            cy.get("#title").type("my first blog")
            cy.get("#author").type("alex")
            cy.get("#url").type("http://www.google.com")
            cy.get("#save-blog-button").click()
            cy.contains("a new blog my first blog by alex added")

        })


        it("users can like a blog" , function(){
       
           
            cy.get("#blog-button").click()
            cy.contains("title")
            cy.contains("author")
            cy.contains("url")
            cy.get("#title").type("my first blog")
            cy.get("#author").type("alex")
            cy.get("#url").type("http://www.google.com")
            cy.get("#save-blog-button").click()
            cy.contains("a new blog my first blog by alex added")
            cy.get("#view-button").click()
            cy.contains("http://www.google.com")
            cy.contains("Likes :0")
                .contains("like").click()
            cy.contains("Likes :1")
                    
            // cy.contains("urls")

            // cy.get("alex logged in").contains("logout").click()
            // cy.contains("username")

        })

        it("user who can delete it ", function() {
            // cy.visit("")
            // cy.contains("blogs")
            // cy.contains("blogs")
            cy.get("#blog-button").click()
            cy.contains("title")
            cy.contains("author")
            cy.contains("url")
            cy.get("#title").type("my first blog")
            cy.get("#author").type("alex")
            cy.get("#url").type("http://www.google.com")
            cy.get("#save-blog-button").click()
            cy.contains("a new blog my first blog by alex added")
            cy.get("#view-button").click()
            cy.contains("http://www.google.com")
            cy.get("#remove-button").click()
            cy.contains("my first blog alex").should("not.exist")

        })
      
        it("Only the creator can see the deelte button not anyone else", function(){
            cy.contains("blogs")
            cy.get("#blog-button").click()
            cy.contains("title")
            cy.contains("author")
            cy.contains("url")
            cy.get("#title").type("my first blog")
            cy.get("#author").type("alex")
            cy.get("#url").type("http://www.google.com")
            cy.get("#save-blog-button").click()
            cy.contains("a new blog my first blog by alex added")

            
            cy.get("#logout").click()
            cy.contains("Log in to application")
            //login to user
            cy.contains("Log in to application")
            cy.get("#username").type("chidi")
            cy.get("#password").type("chidi")
            cy.get("#login-button").click()
            // cy.login({username:"chidi", password:"chidi"})
            cy.contains("blogs")
            cy.get("#view-button").click()
            cy.contains("delete").should("not.exist")
            // cy.contains("Likes :0")
            //     .contains("like").click()
            // cy.contains("Likes :1")
            
           

        })
        it("blogs are ordered accroding to likes",function(){
            // cy.createBlog({title:"testing1", author:"chidi", url:"www.chidi.com/testing1",like: 4 })
            cy.createBlog({title:"testing2", author:"chidi", url:"www.chidi.com/testin2",like: 7 })
            cy.createBlog({title:"testing3", author:"chidi", url:"www.chidi.com/testing3", like:9 })
            
            cy.get(".blog").eq(0).should("contain", "testing3")
            cy.get(".blog").eq(1).should("contain", "testing2")
           
        })





    })


    // describe("")

    
})