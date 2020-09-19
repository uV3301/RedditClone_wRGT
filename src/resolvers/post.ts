import { Resolver, Query, Ctx, Arg, Mutation } from 'type-graphql';
import { MyContext } from 'src/types';
import { Post } from '../entities/Post';
@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() {em}: MyContext): Promise<Post[]> {
        return em.find(Post, {});        
    }
    @Query(() => Post, {nullable: true})
    post(
        @Arg('id') id: number,
        @Ctx() {em}: MyContext
        ): Promise<Post | null> {
        return em.findOne(Post, {id});        
    }
    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() {em}: MyContext
        ): Promise<Post> {
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post;      
    }
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('title', () => String, {nullable: true}) title: string,
        @Arg('id') id: number,
        @Ctx() {em}: MyContext
        ): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if(!post) {
            return null;
        }
        if(typeof title !== "undefined") {
            post.title = title;
            em.persistAndFlush(post);
        }
        return post;
        
    }
}