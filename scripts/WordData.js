/*
	Author: Leanne Douglas
	Date:	March 27, 2022
    Notes:	COMP2132 - Final Project
			This file provides a class that represents a Word (to be used in trivia/guessing games).
*/

class WordData
{
    word;
	hint1;
	hint2;
	difficulty;

	constructor(word, hint, difficulty)
	{
		if(typeof word        !== "string" ||
		   typeof hint        !== "string" ||
		   typeof difficulty  !== "number")
		{
			console.log("Error: This function requires the parameter types: string, string, number.");
			return;
	 	}
		
		this.word       = word;
		this.hint       = hint;
		this.difficulty = difficulty;
	}
}
