import React, {useEffect} from "react";
import Button from "../Button";

const AuthForm = (
    {
        email = '',
        password = '',
        loading,
        setEmail = (f) => f,
        setPassword,
        handleSubmit,
        showPasswordInput = false,
        hideEmailInput = false
    }) => {

    useEffect(() => {

    }, []);

    const password_show_hide = () => {
        const x = document.getElementById("password");
        const show_eye = document.getElementById("show_eye");
        const hide_eye = document.getElementById("hide_eye");
        hide_eye.classList.remove("d-none");
        if (x.type === "password") {
            x.type = "text";
            show_eye.style.display = "none";
            hide_eye.style.display = "block";
        } else {
            x.type = "password";
            show_eye.style.display = "block";
            hide_eye.style.display = "none";
        }
    }

    return (
        <form onSubmit={handleSubmit} className="authForm">
            {
                !hideEmailInput &&
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-at"></i>
                            </span>
                    </div>
                    <input type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="form-control"
                           placeholder="Email"
                           disabled={loading}
                    />
                </div>
            }

            {
                showPasswordInput && (
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                        </div>
                        <input type="password"
                               name="password"
                               id="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="input form-control"
                               placeholder="Password"
                               disabled={loading}
                               required={true}
                               aria-label="password"
                               aria-describedby="basic-addon1"
                        />
                        <div className="input-group-append">
                        <span className="input-group-text input-group-text__eye" onClick={password_show_hide}>
                            <i className="fas fa-eye" id="show_eye"/>
                            <i className="fas fa-eye-slash d-none" id="hide_eye"/>
                        </span>
                        </div>
                    </div>
                )
            }

            <Button type="button" className="buttonJ btn  btn-block mb-3" width="100%"
                    disabled={loading}>
                Submit
            </Button>
        </form>
    )
};

export default AuthForm;