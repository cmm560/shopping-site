let cart = {"products":[]}
let orders = {"orders":[]}
const fs = require("fs")

exports.addToCart = (req,res) => {

    //Then we do something here
    console.log(req.body)

    //the push method adds items to an array
    cart.products.push(req.body)

    var json = JSON.stringify(cart)

    console.log(json)

    res.redirect(303,'/cart')

}

exports.placeOrder = (req,res) => {

    //Then we do something here
    console.log(req.body)

    //the push method adds items to an array
    orders.orders.push(req.body)

    var json = JSON.stringify(orders)

    console.log(json)

    fs.writeFileSync('./data/orders.json',json,'utf8',()=>{})

    res.redirect(303,'/thankyou')

}

exports.clearCart = (req,res) => {

    cart = {"products":[]}

    var json = JSON.stringify(cart)

    res.redirect(303,'/')

}

exports.listCart = (req,res) => {
    console.log(cart)
    res.render('cart', { "cart": cart })
}

exports.getCheckout = (req,res) => {
    console.log(cart)
    let total = cart.products.reduce((previous, current) => (previous + parseFloat(current.price)), 0)
    console.log(total)
    res.render('checkout', { "cart": cart, "total": total })
}

exports.showCategory = (req,res) => { 

    var products = require('../data/products.json')
    var categories = require('../data/categories.json')
    var categoryDetails = categories.categories.filter((category)=>{ 
        return category.url == req.params.category
     })


    var productDetails = products.items.filter((product)=>{ 
        return product.category == req.params.category
     })
     console.log(categoryDetails)
     console.log(productDetails)
     res.render('category',{"products": productDetails,"category":categoryDetails}) 
}

exports.showProduct = (req,res) => { 
    var products = require('../data/products.json')
    var productDetails = products.items.filter((product)=>{ 
        return product.id == req.params.id
     })
    var relatedProducts = products.items.filter((product)=>{ 
        return (product.id != req.params.id && product.category == productDetails[0].category)
    })

    var count = relatedProducts.length;
    var remove = count-4;
    relatedProducts.splice(1, remove);
    
    console.log(productDetails)
    
    
    res.render("product",{"products":productDetails, "related":relatedProducts})
}
    
