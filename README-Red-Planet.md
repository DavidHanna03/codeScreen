# Red Planet Staffing

Welcome to the red planet! At just over one million people as of the 2050 census, Martian settlements are flourishing. As the leading staffing marketplace on Mars, Red Planet connects workplaces with workers to fill shifts.

![Red Planet Staffing](./assets/red-planet.webp)

## Business context

Our primary customers are Martian workplaces. While they have full-time staff, they occasionally need short-term flexible staff to fill gaps in their operations (for example, when a worker is sick or on a vacation to the Moon).

When they need a worker, workplaces post a "shift" on our marketplace. Workers on our marketplace then claim these shifts and are assigned to them. Once assigned, workers perform the work at the shift's start time until it's end time, and are paid based on the hours worked.

## Documentation

- [Server](./server/README.md)
- [Client](./client/README.md)

## Instructions
Our PM wants to solicit feedback from the customers who have had the most experience using our platform in order to learn more about what they like and don’t like, understand worker quality, etc. 

We don’t currently have an analytics solution in place, so as a stopgap, our PM has asked us to pull analytics on the top 3 workplaces and the top 3 workers from our running app in production in order to contact them. 

More specifically, we want the currently active workplaces with the most shifts completed, and the currently active workers with the most shifts completed. For more context on the way our business and application operates, please see read the Business context.

Since these are one-offs, we're building them as a script which we can run locally against our production app. A placeholder for the first script is in `src/scripts/top-workplaces.ts`. You can run this script by running `npm run start:topWorkplaces` in the root directory. 

A placeholder for the second script is in `src/scripts/top-workers.ts`. You can run this script by running `npm run start:topWorkers` in the root directory.

Your task is to implement these script using the existing public web API for the app. Aside from possible bugfixes, avoid modifying the existing APIs or adding new APIs. 

The output of the script after running `npm run start:topWorkplaces` should be formatted as JSON, for example:
```json
 [
   { "name": "Martian Hydro", "shifts": 10 },
   { "name": "Luna Greens", "shifts": 7 },
   { "name": "Red Diamond Mines", "shifts": 6 }
 ]
```

The output of the script after running `npm run start:topWorkers` should be formatted as JSON, for example:
```json
 [
   { "name": "Dmitri David", "shifts": 10 },
   { "name": "Chike Williams", "shifts": 7 },
   { "name": "Fatima Khan", "shifts": 6 }
 ]
```
Please push your changes to the main branch of this repository. You can push one or more commits. Once done, click submit on CodeScreen.
### Exercise Notes
- Passing candidates will have a live-sync follow up so make sure to keep your repo and solution saved.
- We'll run an automated test suite against your solution. As a result:
  - `npm run start:topWorkplaces` *must* run your topWorkplaces script. 
  - `npm run start:topWorkers` *must* run your topWorkers script. 
  - Your script output **must** adhere strictly to the format shown above. While in the real world a PM would be able to interpret a slightly different result, for this task we can't support that.
  - Because we run an automated test suite against your output, **failing to clean up debug statements that use console.log will result in an automatic failure.**
- As much as possible, treat this assessment the way you would your first contribution at a new company. At Clipboard, we care about:
  - Completing the given task accurately
  - Committing high quality code that is easy to review, maintain, and extend
- Focus on making your solution functional rather than optimizing for performance
- We recognize that it’s now commonplace to use AI copilots as a routine part of an engineer’s job and expect you might leverage them while solving this problem, no problem! However, in the live interview you should expect that we will ***rigorously dig*** to understand and ***scrutinize*** how you got to your solution, will ***bias toward skepticism*** if you can’t explain and iterate on your solution on your own, and ***will ultimately reject candidates*** who are over-dependent on AI.
