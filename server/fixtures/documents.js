// ***************************************************************
// FIXTURES (generate data for the Documents collection)
// ***************************************************************

if (Documents.find().count() === 0) {

  Documents.insert({
    userId: "0",
    title: "Signing up for habits",
    content: "It will help me achieve my goals"
  });

}