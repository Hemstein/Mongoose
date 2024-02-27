const express = require("express");
const app= express();
const port=3000;
const connectDb=require("./config/connectdb");
const user = require("./model/user");
require("dotenv").config()

connectDb()

const create=async()=>{
    try {
       const newuser=new user(
           {name:"Haythem",
           age:32,
           favoriteFood:["Pizza"]}
    )
       await newuser.save()
} 
    catch (error) {
    console.log(error)
}}

//create()

const createMany=async()=>{
    try {
        const result=await user.insertMany([
            {name:"Hama",age:35,favoriteFood:["mo9li"]},
            {name:"wa7id",age:32,favoriteFood:["pizza"]},
            {name:"samir",age:22,favoriteFood:["Kabssa"]}])
        console.log(result)
    } catch (error) {
        console.log(error)
    }
   
}


//createMany()
const finduser=async()=>{
    try {
        const result=await user.find()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
   
}
//finduser()
const findoneuser=async()=>{
    try {
        const result=await user.findOne({favoriteFood:"mo9li"})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
   
}

//findoneuser()


const findIDuser=async()=>{
    try {
        const result=await user.findById('65d8806ccbea3baf7b475fe1')
        console.log(result)
    } catch (error) {
        console.log(error)
    }
   
}
//findIDuser()

//Perform Classic Updates by Running Find, Edit, then Save
const addFavoriteFood = async (personId) => {
    try {
      const person = await user.findById(personId);
      if (person) {
        person.favoriteFood.push("hamburger");
        await person.save();
        console.log("Favorite food added successfully:", person);
      } else {
        console.log("Person not found");
      }
    } catch (error) {
      console.log("Error adding favorite food:", error);
    }
  };
  const personIdToUpdate = "65d87c9809a3a1bbdcb1c4b7";
  //addFavoriteFood(personIdToUpdate);
  
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  
  const findName = async () => {
    try {
      const result = await user.findByIdAndUpdate(
        { _id: "65d8d98d9c3f6fdae04c4480" },{ age: 10 },{ new: true }
      );
      console.log(result);
    } catch (error) {
      console.log( error);
    }
  };
  //findName();
  //Delete One Document Using model.findByIdAndRemove
  
  const deletePersonById = async (personId) => {
    try {
      const deletedPerson = await user.findByIdAndDelete(personId);
      {
        console.log("Person deleted successfully:", deletedPerson);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const personIdToDelete = "65d87da9abfdaa882b7a4245";
  //deletePersonById(personIdToDelete);
  
  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  
  const deletePeopleByName = async () => {
    try {
      const result = await user.deleteMany({ name: "Mary" });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  //deletePeopleByName();
  
  //Chain Search Query Helpers to Narrow Search Results
  const SearchQuery = async () => {
    try {
      const res = await user
        .find({ favoriteFood: "hamburger" })
        .sort({ name: 1 })
        .limit(2)
        .select("-age")
        .exec();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  //SearchQuery();




app.listen(port,(err)=>{
    err?console.log(err):console.log("server is running")
});