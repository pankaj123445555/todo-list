const Work = require('../models/works');

module.exports.home = function(req,res)
{
     Work.find({},function(err,work)
    {
        if(err)
        {
            console.log('error in finding the work',err);
            return;
        }
        
        res.render('home',{
            title: "pankaj giri",
            work: work
        })

    });
    
}
// controller for form action
module.exports.createWork = function(req,res)
{
     console.log( 'req.cookie' ,req.cookies);
      Work.create({
          description: req.body.experience,
          work: req.body.work,
          date: req.body.date
      },function(err,work){
          if(err)
          {
              console.log('error on adding data to the database',err);
              return;
          }
        //   console.log(work);
          req.flash('success','added task successfully');
         return  res.redirect('back');
      })
}
// deleting task of todo list
module.exports.delete = function(req,res)
{
    let id = req.body.task;

   console.log(typeof(id));
   
    //  this is for the deleting a single task
    if(typeof(id )== "string")
    {
        Work.findByIdAndDelete(id,function(err){
            if(err)
            {
                console.log('err in deleting the single ids',err);
                return;
            }
            
        })
        
    }
    else  // this is for deleting a multiple task
    {
        for(let i=0;i<id.length;i++)
        {
            Work.findByIdAndDelete(id[i],function(err){
                if(err)
                {
                    console.log('error in deleting the task',err);
                    return;
                }
            })
        }
    }
    req.flash('success','deleted task successfully');
     return res.redirect('back');
}
     
     
    
