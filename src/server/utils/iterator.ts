const { $$asyncIterator } = require("iterall");

export default class RethinkIterator
{
    cursor: any;

    constructor(query: any, conn: any)
    {
        this.cursor = query.changes().run(conn);
    }
  
    async next()
    {
        const val = await (await this.cursor).next();
        
        return {
            value:
            {
                chatAdded: val.new_val
            },
            done: false
        };
    }
  
    async return()
    {
        await (await this.cursor).close();
        
        return { value: undefined, done: true };
    }
  
    async throw(error: any)
    {
        return Promise.reject(error);
    }
  
    [$$asyncIterator]()
    {
        return this;
    }
  }