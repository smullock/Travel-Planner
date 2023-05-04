import React from 'react'

function Default(props) {
  return (
    <div className = 'layout'>
            
            <div className = "heaader">
                <h1 className='logo'> Travel Budget Planner</h1>
            </div>

            <div className = "content">
                {props.children}
            </div>
    </div>
  )
}

export default Default