import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String) 
    hello() {
        return "I can get any data I want";
    }
}



