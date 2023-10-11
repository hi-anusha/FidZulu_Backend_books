const request = require("request");
const base_url = 'http://localhost:3034/';

describe("Book endpoint testing", function () {
    describe("GET books", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + 'books/all/IN', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains productName", (done) => {
            request.get(base_url + 'books/all/IN', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("To Kill a Mockingbird");
                done();
            });
        });
    });
    // describe("GET Books", () => {
    //     it("returns status code 404",  (done) => {
    //         request.get(base_url + 'books', (error, response, body) => {
    //             expect(response.statusCode).toBe(404);
    //             done();
    //         });
    //     });
    // });
    describe("Get /books/all/:location", () => {
        it("should return final books with India tax.", (done) => {
            request.get(base_url + 'books/all/IN', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Great Gatsby");
                expect(response.body).toContain("12.9682,");
                done();
            });
        })
        it("should return prices with Ireland tax", (done) => {
            request.get(base_url + 'books/all/IE', (errpr, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Great Gatsby");
                expect(response.body).toContain("13.517700000000001");
                done();
            })
        })
    })


    describe("Get /books/team", () => {
        it("should return team members names.", (done) => {
            request.get(base_url + 'books/team', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Backend books service");
                expect(response.body).toContain("Anusha Kulkarni");
                done();
            });
        })
      
    })

  

    describe("Get /books/search?minprice=10&maxprice=12", () => {
        it("should return books between minprice=10 and maxprice=12.", (done) => {
            request.get(base_url + 'books/search?minprice=10&maxprice=12', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Catcher in the Rye");
                expect(response.body).toContain("LittleBrown");
                done();
            });
        })
      
    })


    describe("Get /books/search?rating=4", () => {
        it("should return books having rating greater than 4", (done) => {
            request.get(base_url + 'books/search?rating=4', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Hobbit");
                expect(response.body).toContain("MarinerBooks");
                done();
            });
        })
      
    })
});