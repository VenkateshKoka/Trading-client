import React from "react";

const UserProfile = ({handleSubmit, handleChange, username, name, email, about, loading}) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Username</label>
            <input className="form-control" type="text" name="username" value={username}
                   onChange={handleChange}
                   placeholder="Username" disabled={loading}/>
        </div>
        <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" name="name" value={name}
                   onChange={handleChange}
                   placeholder="Name" disabled={loading}/>
        </div>
        <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={email}
                   onChange={handleChange}
                   placeholder="Email" disabled/>
        </div>
        <div className="form-group">
            <label>About</label>
            <textarea className="form-control" name="about" value={about}
                      onChange={handleChange}
                      placeholder="About" disabled={loading}/>
        </div>
        <button className="btn btn-primary" type="submit" disabled={!email || loading}>Submit</button>
    </form>
)


export default UserProfile;