function calcBMI(height, weight) // in m, kgs
{

	return (weight / (height * height)).toPrecision(4);
}

function calcNewBMI(height, weight)
{
	return (1.3 * weight / (Math.pow(height, 2.5))).toPrecision(4);
}

function convertHeight(height, units)
{
	if (units === "in")
	{
		height = height * 0.0254;
	} else {
		height = height / 10;
	}

	return height;
}


function convertWeight(weight, units)
{
	if (units === "lbs")
	{
		weight = weight * 0.453592;
	}

	return weight;
}

function calcTDEE(gender, height, weight, activityLvl, age)
{
	var bmr = 0;
	if (gender === "f") {
		bmr = (9.56 * weight) + (1.85 *  height / 100) - (4.68 * age) + 655;
	}
	else {
		bmr = (13.75 * weight) + (5 * height / 100) - (6.76 * age) + 66;
	}

	return (bmr * activityLvl).toPrecision(5);
}

function loadData()
{
	var weight = $('#weight');
	var height = $('#height');
	var age = $('#age');
	var activityLvl = $('#activity');
	var gender = $('input[type=radio][name=whichGender]');

	if (myStorage.getItem('height')) {
		height.val(myStorage.getItem('height'));
	}
	if (myStorage.getItem('weight')) {
		weight.val(myStorage.getItem('weight'));
	}
	if (myStorage.getItem('age')) {
		age.val(myStorage.getItem('age'));
	}
	if (myStorage.getItem('activityLvl')) {
		activityLvl.val(myStorage.getItem('activityLvl'));
	}
	if (myStorage.getItem('gender')) {
		gender.val(myStorage.getItem('gender'));
	}
}


function saveDataBMI(height, weight)
{
	myStorage.setItem('height', height);
	myStorage.setItem('weight', weight);
}

function saveDataTDEE(age, gender, activityLvl)
{
	myStorage.setItem('age', age);
	myStorage.setItem('gender', gender);
	myStorage.setItem('activityLvl', activityLvl);
}

function initBMI()
{
	loadData();
	$('#submit').click(showResult)
}

function calcBMICat(bmi, whichBMI) {
	var cat = '';
	if (bmi < 18.5)
		cat = 'Underweight';
	else if (bmi < 25)
		cat = "Normal Weight";
	else if (bmi < 30)
		cat = "Overweight";
	else
		cat = "Obese";
	$('#bmi' + whichBMI + 'Cat').html(cat);
}

myStorage = window.localStorage;

function showResult()
{
	var weightOld = $('#weight').val();
	var weight = weightOld;
	var weightUnit = $('input[type=radio][name=whichWeightUnit]:checked').val();
	var heightOld = $('#height').val();
	var height = heightOld;
	var heightUnit = $('input[type=radio][name=whichHeightUnit]:checked').val();

	if (weight && height)
	{
		weight = convertWeight(weight, weightUnit);
		height = convertHeight(height, heightUnit);

		var bmiOld = calcBMI(height, weight);
		var bmiNew = calcNewBMI(height, weight);

		$('#resultsArea').css('display', 'inline');
		$('#bmiOld').html(bmiOld);
		$('#bmiNew').html(bmiNew);
		calcBMICat(bmiOld, 'Old');
		calcBMICat(bmiNew, 'New');

		var age = $('#age').val();
		var gender = $('input[type=radio][name=whichGender]:checked').val();
		if (age && gender)
		{
			var activity = $('#activity').val();
			if (activity > -1)
			{
				var tdee = calcTDEE(gender, height, weight, activity, age);
				$('#tdeeResult').css('display', 'block');
				$('#tdee').html(tdee);
				saveDataTDEE(age, gender, activityLvl);
			}
			else
			{
				$('#missingActivityLevel').css('display', 'inline');
			}

		}
		else
		{
			if (age || gender)
			{
				$('#missingAgeGender').css('display', 'inline');
			}
		}
		saveDataBMI(heightOld, weightOld);
	}
}













