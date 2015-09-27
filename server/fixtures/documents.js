// ***************************************************************
// FIXTURES (generate data for the Documents collection)
// ***************************************************************

if (Documents.find().count() === 0) {

  Documents.insert({
    title: "Signing up for habits",
    content: "It will help me achieve my goals"
  });

}