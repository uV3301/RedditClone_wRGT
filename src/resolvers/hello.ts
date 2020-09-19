
import { Resolver, Query } from 'type-graphql';
@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "I can get any any data from these queries now!"
    }
    @Query(() => String)
    yourname() {
        return "my names joe poe"
    }
}