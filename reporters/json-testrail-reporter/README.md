# TestRail integration

>With WDIO v5, reporting has moved from a centralized process to one that is handled by each of the "sessions" spun up for parallel test execution. This change helped reduce the amount of chatter during WDIO test execution and thus improved performance. The downside is we are no longer able to get a single report for ALL test execution.


### How it works now?
1. Reporter class creates separate file for each "session" execution(mostly it means for each spec file)
2. Inside `wdio.shared.config` in `onComplete` hook merge results from previous step
3. Send aggregated results as a payload via TestRail API(refer to `testrail.js`)
