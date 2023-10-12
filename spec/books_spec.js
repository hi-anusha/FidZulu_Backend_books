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
    describe("GET Books negative testing", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'xyz', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
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
            request.get(base_url + 'books/all/IE', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Great Gatsby");
                expect(response.body).toContain("13.517700000000001");
                done();
            })
        })
    })

    describe("Get query parameters along with location", () => {
        it("should return books with Ireland tax and maxprice and minprice filter ", (done) => {
            request.get(base_url + 'books/all/IE?minprice=10&maxprice=40', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Great Gatsby");
               
                done();
            });
        })
        it("should return prices with India tax", (done) => {
            request.get(base_url + 'books/all/IN?brand=VintageBooks', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("The Great Gatsby");
                expect(response.body).toContain("Classic literature, wealth, love, betrayal");
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

  

    
});