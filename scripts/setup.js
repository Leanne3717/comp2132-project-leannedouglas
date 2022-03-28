/*
	Author: Leanne Douglas
	Date:	March 27, 2022
    Notes:	COMP2132 - Final Project
			This file reads a JSON data file and creates an array of Word objects.
*/

const wordsFileURL = "data/words.json";
const wordList     = [];

// Fetch the Word object data from a JSON file and create an array for each property.
fetch(wordsFileURL)
    .then(function(response)
    {
        if(response.ok)
        {
            console.log("Network response is okay");
            return response.json();
        }
        else
        {
            console.log("Network error: fetch failed.");
        }
    })
    .then(function(data)
    {
        const arrayOfWords        = data.map(value => value.word);
        const arrayOfHints        = data.map(value => value.hint1);
        const arrayOfDifficulties = data.map(value => value.difficulty);
        
        // Create new Word objects and add them to the collection
        for(let index = 0; index < arrayOfWords.length; index++)
        {
            newWordObject = new WordData(arrayOfWords[index],
                arrayOfHints[index],
                arrayOfDifficulties[index]);
            
            wordList.push(newWordObject);
        }
    })
    .catch(function(error)
    {
        console.log(`There was a(n) '${error}' error when attempting to create the word array.`);
    });
