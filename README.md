# Lodgify - FE Technical Challenge

Hi there!

We would like to give you the opportunity to show us your technical skills. Below you'll find a general outline of the test and the resources needed.

Feel free to create the small project as you wish, as long as **React** is used as the main frontend library.

Preferably, please provide your result as a link to a private github repository where you can  add us as collaborator (@osmellodgify @kluczynskib @lodgifyrecruitment). If for some reasons, this is not possible, you can still send us an archive with the codebase of your project. **Once you complete the test please send an email with the url of the repository or the archive to the recruiter that contacted you.**

Below are the three main rules you must follow, everything else is completely up to you!

1. **Let it run**. We like code that works and shows us amazing **clickable** ui.
2. **Tell us about it.** Please provide a `[README.md](http://readme.md)` file that explains how to use your amazing code.
3. **Keep it Simple**. This is just a test. Don't provide us a full platform with thousands of features. You will have time to do that with us when you join the team!

You're probably still asking yourself, "But what exactly do I have to do?". Here's your answer:

<aside>
📖 Create a widget that shows the current progress of the profile creation of the user. The user should be able to see the missing tasks of a specific area and be able to mark them as done.

</aside>

In order to do that, we provide the **resources** and the **specifications** below:

### Resources

To complete the assessment, here is the mockup:

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F0HPjyMf6r4ljGKGe4RgqZ3%2FAccordion-Challenge%3Fnode-id%3D0%253A1](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F0HPjyMf6r4ljGKGe4RgqZ3%2FAccordion-Challenge%3Fnode-id%3D0%253A1)

This is the expected behaviour with an interactive prototype:

[Accordion Challenge](https://www.figma.com/proto/0HPjyMf6r4ljGKGe4RgqZ3/Accordion-Challenge?page-id=0%3A1&node-id=80%3A312&viewport=241%2C48%2C0.19&scaling=min-zoom)

And we also provide the following api with the format below:

[https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress](https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress)

```json
[
	{
		"name": "Group 1", //name of the group in the accordion
		"tasks": [ //the lists of the checkboxes
			{
				"description": "Task 1 - 1",  //the label of the checkbox
				"value": 23, // the amount of value will increase the progress if checked
				"checked": false, //if it's checked by default
			},
			...
		]
	},
	...
]
```

(there is no need to add it to your project, you can call it as a normal api)

### Specifications

The challenge is to build the widget in the mockup where the value of the progress will be the **normalized** sum of the values of the checked tasks. Each accordion element is one group and every task is a checkbox inside that group.

<aside>
💡 For **Normalized** in this case we mean to reduce a number to its percentage equivalent of the sum of all the values. In Math:  

$Nt = Vt * 100 / ∑(Vt)$

where:
$Nt$ is the normalized value of a task
$Vt$ is the scalar value of the task
$∑(Vt)$ is the sum of all the tasks values.

for example if the sum of the tasks is 423 and a task has a value of 36 the normalized value will be  8.51

</aside>

**Finally the user should be able to check and/or uncheck one of the tasks and see the progress bar change and if a group have all the checks should be marked as green.**

## Some suggestions

- Try to accomplish all the requirements in the best way possible before trying to add more features or other features. We will evaluate just the part that we asked.
- Try to be essential and follow [KISS](https://en.wikipedia.org/wiki/KISS_principle). If you decide to use an external library try to still be able to show your knowledge and your strengths.
- If you think there are too many things to focus on, try to asses the importance of the different parts and come out with a thoughtful MVP. Please explain your reasons, this will be an important insight of your capability to manage work effort
- We will not evaluate performance although we will appreciate performant solution as a plus.
- We are not really interested in solving the problem. We are more interested in a code that solves the problem and is readable and maintainable.

That's it. Enjoy 😉