function signUpUser() {
    var fName = document.getElementById('firstName').value;
    console.log(fName);
    var lName = document.getElementById('lastName').value;
    console.log(lName);
    var email = document.getElementById('email').value;
    console.log(email);
    var pwd = document.getElementById('password').value;
    console.log(pwd);
    var confirmPwd = document.getElementById('confirmPassword').value;
    console.log(confirmPwd);

    var verifyfName = verifyLength(fName, 1, 6);
    
    if (!verifyfName) {
        document.getElementById('firstNameError').innerHTML = "firstName must be between 1 and 6 characters";
        document.getElementById('firstNameError').style.color = "red";
    }
    var verifylName = verifyLength(lName, 1, 10);
    if (!verifylName) {
        document.getElementById('lastNameError').innerHTML = "lastName must be between 1 and 10 characters";
        document.getElementById('lastNameError').style.color = "red";
    }
    var verifyEmail = validateEmail(email);
    if (!verifyEmail) {
        document.getElementById('emailError').innerHTML = "invalid email";
        document.getElementById('emailError').style.color = "red";
    }

    if (pwd != confirmPwd) {
        document.getElementById('pwdError').innerHTML = "password & confirm Password must match";
        document.getElementById('pwdError').style.color = "red";
    }

    var myusers = JSON.parse(localStorage.getItem('users') || '[]'); //=> la creation du key 'users avec la valeur '[]'
    console.log(myusers); // => il m'affiche un tableau vide 

    if (fName != " " && lName != " " && email != " " && pwd != " " && confirmPwd != " " && (pwd == confirmPwd) && verifyEmail && verifyfName && verifylName) {

        var userId = JSON.parse(localStorage.getItem('userId') || '2');
        //objet
        var allUsers = {
            id: userId,
            FirstName: fName,
            LastName: lName,
            email: email,
            password: pwd,
            confirmPwd: confirmPwd,
            role: 'user'
        }
        console.log(allUsers);
        // nom_tableau.push(objet);
        myusers.push(allUsers);
        console.log(myusers); //=> tableau d'objet [{},{},{}]
        localStorage.setItem('userId', userId + 1)
        //sauvegarder mes informations dans localStorage
        localStorage.setItem('users', JSON.stringify(myusers));
    }

}
function signUpAdmin() {
    var fName = document.getElementById('firstName').value;
    console.log(fName);
    var lName = document.getElementById('lastName').value;
    console.log(lName);
    var email = document.getElementById('email').value;
    console.log(email);
    var pwd = document.getElementById('password').value;
    console.log(pwd);
    var confirmPwd = document.getElementById('confirmPassword').value;
    console.log(confirmPwd);

    var verifyfName = verifyLength(fName, 1, 6);
    if (!verifyfName) {
        document.getElementById('firstNameError').innerHTML = "firstName must be between 1 and 6 characters";
        document.getElementById('firstNameError').style.color = "red";
    }
    var verifylName = verifyLength(lName, 1, 10);
    if (!verifylName) {
        document.getElementById('lastNameError').innerHTML = "lastName must be between 1 and 10 characters";
        document.getElementById('lastNameError').style.color = "red";
    }
    var verifyEmail = validateEmail(email);
    if (!verifyEmail) {
        document.getElementById('emailError').innerHTML = "invalid email";
        document.getElementById('emailError').style.color = "red";
    }

    if (pwd != confirmPwd) {
        document.getElementById('pwdError').innerHTML = "password & confirm Password must match";
        document.getElementById('pwdError').style.color = "red";
    }
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser.role == 'superAdmin') {
        var myusers = JSON.parse(localStorage.getItem('users') || '[]'); //=> la creation du key 'users avec la valeur '[]'
        console.log(myusers); // => il m'affiche un tableau vide 
        if (fName != " " && lName != " " && email != " " && pwd != " " && confirmPwd != " " && (pwd == confirmPwd) && verifyEmail && verifyfName && verifylName) {
            var userId = JSON.parse(localStorage.getItem('userId') || '2');
            //objet
            var allUsers = {
                id: userId,
                FirstName: fName,
                LastName: lName,
                email: email,
                password: pwd,
                confirmPwd: confirmPwd,
                role: 'admin'
            }
            console.log(allUsers);
            // nom_tableau.push(objet);
            myusers.push(allUsers);
            console.log(myusers); //=> tableau d'objet [{},{},{}]
            localStorage.setItem('userId', userId + 1)
            //sauvegarder mes informations dans localStorage
            localStorage.setItem('users', JSON.stringify(myusers));
        }


    }


}
function verifyLength(ch, min, max) {
    return ch.length >= min && ch.length <= max
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function addProduct() {
    var productName = document.getElementById('productName').value;
    var price = document.getElementById('price').value;
    var qty = document.getElementById('quantity').value;
    var category = document.getElementById('clothes').value;

    var imageProduct = document.getElementById('image').value;
    console.log('imageProduct', imageProduct);
    var image = replaceCh(imageProduct);
    console.log('image', image);
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (price < 0) {
        document.getElementById('priceError').innerHTML = "the price must be more than 0";
        document.getElementById('priceError').style.color = "red";
    }
    if (qty < 0) {
        document.getElementById('quantityError').innerHTML = "the quantity must be more than 0";
        document.getElementById('quantityError').style.color = "red";
    }

    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var productExist = false;
    for (var i = 0; i < products.length; i++) {
        if (products[i].productName == productName) {
            productExist = true;
            document.getElementById('productNameError').innerHTML = 'product Name exist already';
            document.getElementById('productNameError').style.color = "red";
        }

    }
    if (connectedUser.role == 'superAdmin' || connectedUser.role == 'admin') {
        var productId = JSON.parse(localStorage.getItem('productId') || '1');
        if (productName != " " && price != " " && price >= 0 && qty != " " && qty >= 0 && (productExist == false)) {
            var allProducts = {
                id: productId,
                productName: productName,
                price: price,
                quantity: qty,
                category : category,
                image: image
            }
            products.push(allProducts);
            localStorage.setItem('productId', productId + 1);
            localStorage.setItem('products', JSON.stringify(products));
        }

    }



}

//afficher mes produits
function displayProduct() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    var products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    if (connectedUser.role == 'superAdmin' || connectedUser.role == 'admin') {
        var productTable = `<table class="table">
        <thead>
          <tr>
          <th scope="col">compteur i</th>
            <th scope="col">id</th>
            <th scope="col">ProductName</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>`;
        for (let i = 0; i < products.length; i++) {
            productTable = productTable + `<tr>
            <td>${i}</td>
            <td>${products[i].id}</td>
            <td>${products[i].productName}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].quantity}</td>
            <td>
    
            <button type="button" class="btn btn-primary" onclick="displayProductDetails(${products[i].id})">Display</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i}, 'products')">Delete</button>
            <button type="button" class="btn btn-success" onclick="editProduct(${products[i].id})">Edit</button>
    
            </td>
          </tr>`;
        }


        productTable += `</tbody>
      </table>`;

        document.getElementById('contact').innerHTML = productTable;
    }


}


function displayUsers() {
    var users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    var myusers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == 'user') {
            myusers.push(users[i]);
        }
    }
    console.log(myusers); // => un tableau d'objet dont le role est 'user'
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser.role == 'superAdmin' || connectedUser.role == 'admin') {
        var userTable = `<table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">FirstName</th>
        <th scope="col">LastName</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`;
        for (let i = 0; i < myusers.length; i++) {
            userTable = userTable + `<tr>
        <td>${myusers[i].id}</td>
        <td>${myusers[i].FirstName}</td>
        <td>${myusers[i].LastName}</td>
        <td>${myusers[i].email}</td>
        <td>${myusers[i].password}</td>
        <td>

        <button type="button" class="btn btn-primary">Display</button>
        <button type="button" class="btn btn-danger" onclick="deleteObject(${i}, 'users')">Delete</button>
        <button type="button" class="btn btn-success">Edit</button>

        </td>
      </tr>`;
        }


        userTable += `</tbody>
  </table>`;
        document.getElementById('home').innerHTML = userTable;
    }

}


function displayAdmins() {

    var users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    var myadmins = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == 'admin') {
            myadmins.push(users[i]);
        }
    }
    console.log(myadmins); // => un tableau d'objet dont le role est 'user'

    var userTable = `<table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">FirstName</th>
        <th scope="col">LastName</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < myadmins.length; i++) {
        userTable = userTable + `<tr>
        <td>${myadmins[i].id}</td>
        <td>${myadmins[i].FirstName}</td>
        <td>${myadmins[i].LastName}</td>
        <td>${myadmins[i].email}</td>
        <td>${myadmins[i].password}</td>
        <td>

        <button type="button" class="btn btn-primary">Display</button>
        <button type="button" class="btn btn-danger" onclick="deleteObject(${i}, 'users')">Delete</button>
        <button type="button" class="btn btn-success">Edit</button>

        </td>
      </tr>`;
    }


    userTable += `</tbody>
  </table>`;
    document.getElementById('profile').innerHTML = userTable;

}

function login() {
    var email_login = document.getElementById('email').value;
    var password_login = document.getElementById('password').value;
    console.log(email_login);
    console.log(password_login);
    if (email_login == " " || password_login == "") {
        document.getElementById('loginError').innerHTML = 'verify your password or email';
        document.getElementById('loginError').style.color = "red";
    }

    if (validateEmail(email_login) && email_login != "" && password_login != "") {
        var users = JSON.parse(localStorage.getItem('users'));
        var connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '[]');
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email_login && users[i].password == password_login) {
                connectedUser = users[i];
                console.log(connectedUser);
                localStorage.setItem('connectedUser', JSON.stringify(connectedUser));
                if (connectedUser.role == 'user') {
                    //la redirection vers la page index.html
                    location.replace('index.html');
                }
                else if (connectedUser.role == 'admin' ) {
                    //la redirection vers la page dashboard-admin.html
                    location.replace('dashboard-admin.html');

                }else if ( connectedUser.role == "superAdmin") {
                    //la redirection vers la page dashboard-admin.html
                    location.replace('dashboard-superAdmin.html');

                }
            }

        }

        if (!connectedUser) {
            document.getElementById('loginError').innerHTML = "check your email or password";
            document.getElementById('loginError').style.color = "red";
        }

    }

}

function setHeader() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    console.log('connectedUser', connectedUser);
    var header = " ";
    if (connectedUser) {
        if (connectedUser.role == 'user') {
            header = `<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item "><a href="shop.html" class="nav-link">products</a></li>
            <li class="nav-item "><a href="contact.html" class="nav-link ">contact</a></li>
            <li class="nav-item "><a href="" class="nav-link ">${connectedUser.FirstName} ${connectedUser.LastName}</a></li>
            <li class="nav-item"><button onclick="logout()" class="nav-link btn btn-warning py-2" href="">logout</button></li>`;

        } else if (connectedUser.role === 'admin' ) {
            header = `<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item "><a href="shop.html" class="nav-link">products</a></li>
            <li class="nav-item "><a href="addProduct.html" class="nav-link">add Product</a></li>
            <li class="nav-item "><a href="dashboard-admin.html" class="nav-link ">Dashboard Admin</a></li>
            <li class="nav-item "><a href="" class="nav-link active">${connectedUser.FirstName} ${connectedUser.LastName}</a></li>
            <li class="nav-item"><button onclick="logout()"  class="nav-link btn btn-warning py-2" >logout</button></li>`;
        }
        else if ( connectedUser.role == 'superAdmin') {
            header = `<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item "><a href="shop.html" class="nav-link">products</a></li>
            <li class="nav-item "><a href="addProduct.html" class="nav-link">add Product</a></li>
            <li class="nav-item "><a href="dashboard-superAdmin.html" class="nav-link ">Dashboard Admin</a></li>
            <li class="nav-item "><a href="" class="nav-link active">${connectedUser.FirstName} ${connectedUser.LastName}</a></li>
            <li class="nav-item"><button onclick="logout()"  class="nav-link btn btn-warning py-2" >logout</button></li>`;
        }

    } else {
        //ma3ndich user connecté
        header = `	<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item "><a href="signup.html" class="nav-link" >signup</a></li>
                    <li class="nav-item"><a href="login.html" class="nav-link">login</a></li>`;
    }
    document.getElementById('headerId').innerHTML = header;

}


function logout() {

    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser == true) {
        sessionStorage.removeItem('connectedUser')
        location.replace('login.html');
    }
}


//-------------------Delete Object  ---------------------//

function deleteObject(pos, key) {
    var objects = JSON.parse(localStorage.getItem(key));
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    //refresh the page
    location.reload();


}

//------------------------Super Admin -----------------//
function superAdmin() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');

    var superadmin = {
        id: 1,
        FirstName: 'abderrahmen',
        LastName: 'massmoudi',
        email: 'abdou@superadmin.tn',
        password: '123',
        confirmPwd: '123',
        role: 'superAdmin'
    };
    users.push(superadmin);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('superAdminAdded', 'true');
}

function displayProductDetails(id) {
    console.log(id);
    localStorage.setItem('prDetails', id)
    location.replace('productDetails.html');
}
function displayPdtDetails() {
    var idPr = JSON.parse(localStorage.getItem('prDetails'));
    alert(idPr)
    var product = searchById(idPr, 'products');
    console.log(product); //objet qui possede l'id en question
    document.getElementById('ProductName').innerHTML = product.productName;
    document.getElementById('Productprice').innerHTML = product.price + "$";
    document.getElementById('ProductQty').innerHTML = product.quantity;
}
function searchById(id, key) {
    var objects = JSON.parse(localStorage.getItem(key));
    var myobject;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            myobject = objects[i];
        }

    }
    return myobject;
}

function shop() {
    var products = JSON.parse(localStorage.getItem('products'));
    var productTable = ""
    for (let i = 0; i < products.length; i++) {
        productTable += `<div class="col-lg-4 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="${products[i].image}" alt="">
            <div class="product-details">
                <h6>${products[i].productName}</h6>
                <div class="price">
                    <h6>$ ${products[i].price}</h6>
                </div>
               
                <div class="price">
                    <button class="btn btn-warning" onclick="goToReservation(${products[i].id})">Add </button>
                </div>
                <div class="prd-bottom">

                    <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    }
    document.getElementById('productTable').innerHTML = productTable;
}

function replaceCh(ch) {
    var newCh = ch.replace('fakepath', "Users/CrocoCoder Trainer/Desktop/crocoFSS/javascript/Karma/img");
    return newCh;
}

//-----------------------Edit -------------------//
function editProduct(id) {
    console.log(id);
    var product = searchById(id, 'products'); //un seul objet 
    console.log('my object is', product);
    var editForm = `<div class="col-lg-6 mx-auto">
    <div class="login_form_inner">
        <h3>Edit Product</h3>
        <div class="row login_form" >
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="newProductName" name="newProductName" placeholder="Product Name **" value="${product.productName}">
            </div>
            <div id="productNameError">

            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="newPrice" name="newPrice" placeholder="Price **" value="${product.price}">
            </div>
            <div id="priceError">

            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="newQuantity" name="newQuantity" placeholder="Quantity **" value="${product.quantity}">
            </div>
            <div id="quantityError"></div>
            
            <div class="col-md-12 form-group">
                <button type="submit" onclick="validateEditProduct(${product.id})" value="submit" class="primary-btn">Edit Product</button>
            
            </div>
        </div>
    </div>
</div>`;
    document.getElementById('editForm').innerHTML = editForm;
}
function validateEditProduct(id) {
    var newProductName = document.getElementById('newProductName').value;
    if (newProductName == "") {
        document.getElementById('productNameError').innerHTML = "product Name must be not empty";
        document.getElementById('productNameError').style.color = "red";
    }
    console.log(newProductName);
    var newPrice = document.getElementById('newPrice').value;
    console.log(typeof (newPrice));
    if (Number(newPrice) < 0 || newPrice == "") {
        document.getElementById('priceError').innerHTML = "product Price must be not null and must be positive";
        document.getElementById('priceError').style.color = "red";
    }
    var newQuantity = document.getElementById('newQuantity').value;
    if (Number(newQuantity) < 0 || newQuantity == "") {
        document.getElementById('quantityError').innerHTML = "product Quantity must be not null and must be positive";
        document.getElementById('quantityError').style.color = "red";
    }
    console.log(newQuantity);
    console.log(id);
    var products = JSON.parse(localStorage.getItem('products'));
    if (newQuantity > 0 && newPrice > 0 && newQuantity != "" && newProductName != "" && newPrice != "") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                //9dim = valeur jdida
                products[i].productName = newProductName;
                products[i].price = newPrice;
                products[i].quantity = newQuantity;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
        location.reload();


    }

}

function goToReservation(id) {
    console.log('idPrToReseve', id);
    localStorage.setItem('idPrToReseve', id);
    location.replace('reservation.html');
}

function displayProductToReserve() {
    var idPr = JSON.parse(localStorage.getItem('idPrToReseve'));
    console.log(idPr);
    var product = searchById(idPr, 'products'); //produit qui a l'id idPr
    document.getElementById('prName').innerHTML = product.productName;
    document.getElementById('prPrice').innerHTML = product.price + "$";
    document.getElementById('prQty').innerHTML = product.quantity;
    var image = `<img class="img-fluid" style="width:50%" src="${product.image}" alt="">`;
    document.getElementById('imagePr').innerHTML = image;
}

function validateReservation() {
    var qty = document.getElementById('qty').value;
    console.log(qty);
    if (Number(qty) < 0) {
        document.getElementById('errorQty').innerHTML = 'qty must be positive and not null';
        document.getElementById('errorQty').style.color = "red";
    }

    var idPr = JSON.parse(localStorage.getItem('idPrToReseve'));
    console.log(idPr);
    var product = searchById(idPr, 'products'); //produit qui a l'id idPr

    if (Number(qty) > product.quantity) {
        document.getElementById('errorQty').innerHTML = 'qty not available';
        document.getElementById('errorQty').style.color = "red";
    }
    //je vais lancer ma commande
    if (qty < product.quantity && qty > 0) {
        var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
        var orders = JSON.parse(localStorage.getItem('orders') || '[]');
        var ordreId = JSON.parse(localStorage.getItem('ordreId') || '1');
        var order = {
            id: ordreId,
            idConnect: connectedUser.id,
            idPr: idPr,
            qty: qty
        }
        orders.push(order);
        localStorage.setItem('ordreId', ordreId + 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        var products = JSON.parse(localStorage.getItem('products'));
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idPr) {
                products[i].quantity = products[i].quantity - Number(qty);
            }
        }
        localStorage.setItem('products', JSON.stringify(products));

        location.replace('cart.html');
    }

}


function basket() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var myOrder = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idConnect == connectedUser.id) {
            myOrder.push(orders[i]);
        }

    }

    console.log('tableau d objet avec mes ordres passées', myOrder);


    var basketTable = "";
    basketTable += ` <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>`;
    var totalPrice;
    var somme = 0;
    for (let i = 0; i < myOrder.length; i++) {
        var pr = searchById(Number(myOrder[i].idPr), 'products');
        console.log(pr);
        totalPrice = (pr.price * myOrder[i].qty);
        somme = somme + totalPrice;
        basketTable += `<tr>
        <td>
            <div class="media">
                <div class="d-flex">
                    <img width="20%" src="${pr.image}" alt="">
                </div>
                <div class="media-body">
                    <p>${pr.productName}</p>
                </div>
            </div>
        </td>
        <td>
            <h5>$ ${pr.price}</h5>
        </td>
        <td>
            <h5> ${myOrder[i].qty}</h5>
        </td>
        <td>
            <h5>$ ${totalPrice}</h5>
        </td>
        <td>
           <button class="btn btn-success" onclick="editOrder(${myOrder[i].id})">Edit</button>
           <button class="btn btn-danger" onclick="deleteOrder(searchObjectPosition(${myOrder[i].id} , 'orders') , ${myOrder[i].id})">Delete</button>
        </td>
    </tr>`;

    }


    basketTable += `<tr>
            <td>

            </td>
            <td>

            </td>
            <td>
                <h5>Subtotal</h5>
            </td>
            <td>
                <h5>$ ${somme}</h5>
            </td>
        </tr>
        </tbody></table>`;
    document.getElementById('basketTable').innerHTML = basketTable;
}


function nbOrdres() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var nborders = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idConnect == connectedUser.id) {
            nborders++;
        }

    }
    document.getElementById('nborders').innerHTML = '(' + nborders + ')'
}


function sendMessage() {
    var nameUser = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var msg = document.getElementById('message').value;
    var messages = JSON.parse(localStorage.getItem('messages') || '[]'); //[]
    var messageId = JSON.parse(localStorage.getItem('messageId') || '1'); //1
    var message = {
        id: messageId,
        nameUser: nameUser,
        email: email,
        subject: subject,
        msg: msg,
        status: 'en attente'
    }

    messages.push(message);
    localStorage.setItem('messageId', messageId + 1);
    localStorage.setItem('messages', JSON.stringify(messages));

}

function displayMessages() {
    var messages = JSON.parse(localStorage.getItem('messages'));
    var messageTable = `<table class="table">
    <thead>
      <tr>
      
        <th scope="col">id</th>
        <th scope="col">Name</th>
        <th scope="col">Subject</th>
        <th scope="col">Email</th>
        <th scope="col">Message</th>
        <th scope="col">statuts</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < messages.length; i++) {
        messageTable = messageTable + `<tr>
        
        <td>${messages[i].id}</td>
        <td>${messages[i].nameUser}</td>
        <td>${messages[i].subject}</td>
        <td>${messages[i].email}</td>
        <td>${messages[i].msg}</td>
        <td>${messages[i].status}</td>
        <td>

        <button class="btn btn-danger" onclick="deleteObject(${i},'messages')"><i class="fa fa-trash"></i></button>
        <button class="btn btn-success" onclick="answerMessage(${messages[i].id})"><i class="fa fa-check"></i></button>

        </td>
      </tr>`;
    }


    messageTable += `</tbody>
  </table>`;

    document.getElementById('message').innerHTML = messageTable;

}

function answerMessage(id) {
    console.log(id);

    var messageSearched = searchById(id, 'messages');
    console.log(messageSearched);

    var messageForm = `	<div class="row contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
    <div class="col-md-12">
        <div class="form-group">
            <input type="text" class="form-control" disabled=true value="${messageSearched.nameUser}" id="name" name="name" placeholder="Enter your name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'">
        </div>
        <div class="form-group">
            <input type="email" class="form-control" id="email" name="email" disabled=true value="${messageSearched.email}"  placeholder="Enter email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="subject" name="subject" disabled=true value="${messageSearched.subject}"  placeholder="Enter Subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'">
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group">
            <textarea class="form-control" disabled=true value=""  name="message" id="message" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'">${messageSearched.msg}</textarea>
        </div>
    </div>
    <div class="col-md-12">
    <div class="form-group">
        <textarea class="form-control" name="message" id="messageResponse" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Answer Message'"></textarea>
    </div>
    <div id="respError"></div>
</div>
    <div class="col-md-12 text-right">
        <button type="submit" value="submit" onclick="ValidateAnswer(${messageSearched.id})" class="primary-btn">validate answer</button>
    </div>
</div>`;
    document.getElementById('messageForm').innerHTML = messageForm;

}

function ValidateAnswer(id) {
    console.log(id);
    var messageResponse = document.getElementById('messageResponse').value;
    var messages = JSON.parse(localStorage.getItem('messages'))
    if (messageResponse.length > 0) {
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                messages[i].status = 'valider';
                messages[i].response = messageResponse;
            }
        }
        localStorage.setItem('messages', JSON.stringify(messages));
        location.reload();
    } else {
        document.getElementById('respError').innerHTML = "veuillez saisir une reponse pour l'user";
        document.getElementById('respError').style.color = "red";
    }
}


function searchproduct(e){
    var category = document.getElementById('categorySearched').value;
    var key = e.keyCode;
    console.log(key);
    if(key == 13){
        localStorage.setItem('categorySearched', category);
       
    }
}

function searchedByCategory(){
    var products = JSON.parse(localStorage.getItem('products'));
    var categorySearched = localStorage.getItem('categorySearched');
    var tableCategory =[]
    for (let i = 0; i < products.length; i++) {
        if(products[i].category == categorySearched){
            tableCategory.push(products[i]);
        }
        
    }
    console.log(tableCategory);
    return tableCategory;
}

function displaySearchedCategory(){
    var table = searchedByCategory();
    console.log(table);


    var productTable = ""
    for (let i = 0; i < table.length; i++) {
        productTable += `<div class="col-lg-4 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="${table[i].image}" alt="">
            <div class="product-details">
                <h6>${table[i].productName}</h6>
                <div class="price">
                    <h6>$ ${table[i].price}</h6>
                </div>
               
                <div class="price">
                    <button class="btn btn-warning" onclick="goToReservation(${table[i].id})">Add </button>
                </div>
                <div class="prd-bottom">

                    <a href="" class="social-info">
                        <span class="ti-bag"></span>
                        <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-heart"></span>
                        <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-sync"></span>
                        <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    }
    document.getElementById('productTable').innerHTML = productTable;

}

function searchObjectPosition(id , key){

    var objects = JSON.parse(localStorage.getItem(key) || '[]');
    var pos;
    for (let i = 0; i < objects.length; i++) {
        if(objects[i].id == id){
            pos = i;
        }
    }

    return  pos;
}

//console.log(searchObjectPosition(4  , 'products'));

function deleteOrder(pos , id){
    //recuperation de la qunatite que je veux l'effacer
    var order = searchById(Number(id), 'orders');
    var qty =  order.qty;
    //j'ai cherché le produit en fonction de son id dans tableau d'objet products
    var products = JSON.parse(localStorage.getItem('products'));

    for (let i = 0; i < products.length; i++) {
        if(products[i].id == order.idPr){
            //dés que je le trouve j'affecte l'ancienne quantité avec la quantite que je viens de l'effacer
            products[i].quantity = Number(products[i].quantity) + Number(qty);
        }
        
    }
    //j'ai sauvegarder les nouvelles modifications
    localStorage.setItem('products', JSON.stringify(products));
    //j'ai supprimé l'ordre en question
    deleteObject(pos , 'orders');
}

function editOrder(id){
    console.log(id);
    var order = searchById(Number(id), 'orders'); 
    var editOrderForm = `	<div class="col-lg-6 mx-auto">
    <div class="login_form_inner">
        <h3>Edit Order</h3>
                  
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" value="${order.qty}" id="editQty" name="quantity" placeholder="Quantity **" >
            </div>
            <div id="quantityError"></div>
            
            <div class="col-md-12 form-group">
                <button type="submit" onclick="validateEditOrder(${order.id})" value="submit" class="primary-btn">validate edit order</button>
            
            </div>
        </div>
    </div>
</div>`;
document.getElementById('editOrderForm').innerHTML = editOrderForm;
}

function validateEditOrder(id){
    console.log(id);
    var editQty = document.getElementById('editQty').value;
    console.log(editQty);

    var order = searchById(Number(id), 'orders');//=> order={id : , idCOnnect: , idPr :5 , qty:7}
    //order.idPr => 5
    var product = searchById(Number(order.idPr), 'products')//=> le produit avec l'id 5
    var diff = Number(editQty) - Number(order.qty) ;
    if(editQty < 0){
        document.getElementById('quantityError').innerHTML = "qty must be positive";
        document.getElementById('quantityError').style.color = "red";
    }
    if(product.quantity < diff){
        document.getElementById('quantityError').innerHTML = "qty not available";
        document.getElementById('quantityError').style.color = "red";

    }else{
        //qty available
        if(editQty == 0){
            deleteOrder(searchObjectPosition(order.id ,'orders') , order.id);
        }else{
           var orders = JSON.parse(localStorage.getItem('orders'));
           for (let i = 0; i < orders.length; i++) {
               if(orders[i].id == id){
                   orders[i].qty = Number(editQty);

               } 
           }
           localStorage.setItem('orders', JSON.stringify(orders));

           var products = JSON.parse(localStorage.getItem('products'));
           for (let i = 0; i < products.length; i++) {
               if(products[i].id == order.idPr ){
                   products[i].quantity =  Number(products[i].quantity) - Number(diff);
               }   
           }
           localStorage.setItem('products', JSON.stringify(products));
           location.reload();



        }
    }


}

function exportPDF(e){
    var pdf = document.getElementById('html2pdf');
    console.log(pdf);
    html2pdf(pdf);
}