# how to run
## cp .env.example .env
## revise the password of postgresql to your password your are using;
## npm i;
## npm run start:dev
## http://localhost:3000/documentation

* Maybe just restarting the TS server can work.
Using VsCode:
type: ctrl + shift + p
choose: > TypeScript: Restart TS server

* Fixed a problem in typeORM:         
At Row 1907:executeEntitiesAndRawResults
 // .orderBy(orderBys) //here is the problem, comment it. Fix problem!
 // And I have to use queryBuilder.orderBy("topic_created_at", "DESC") for order clause! :)
And delete distinct
            .select(` ${querySelects.join(", ")}`)
                // .select(`DISTINCT ${querySelects.join(", ")}`)
* 
