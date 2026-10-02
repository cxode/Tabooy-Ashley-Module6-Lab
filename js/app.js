"use strict";



function isValidStudentNumber(value) {
  if (typeof value !== "string") {
    return false;
  }

  return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
  if (typeof value !== "string") {
    return false;
  }

  return (
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[@$!]/.test(value) &&
    !/\s/.test(value)
  );
}

/* CommonJS export for Node-based autograder tests */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

/* --------------------------------------------------
   Browser-only code
-------------------------------------------------- */

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

function init() {
  const form = document.getElementById("registrationForm");
  if (!form) {
    return;
  }

  const els = {
    fullName: document.getElementById("fullName"),
    fullNameError: document.getElementById("fullNameError"),

    studentNumber: document.getElementById("studentNumber"),
    studentNumberError: document.getElementById("studentNumberError"),

    email: document.getElementById("email"),
    emailError: document.getElementById("emailError"),

    mobileNumber: document.getElementById("mobileNumber"),
    mobileNumberError: document.getElementById("mobileNumberError"),

    password: document.getElementById("password"),
    passwordError: document.getElementById("passwordError"),
    passwordFeedback: document.getElementById("passwordFeedback"),

    confirmPassword: document.getElementById("confirmPassword"),
    confirmPasswordError: document.getElementById("confirmPasswordError"),

    course: document.getElementById("course"),
    courseError: document.getElementById("courseError"),

    terms: document.getElementById("terms"),
    termsError: document.getElementById("termsError"),

    successMessage: document.getElementById("successMessage"),
    registrationSummary: document.getElementById("registrationSummary"),

    summaryName: document.getElementById("summaryName"),
    summaryStudentNumber: document.getElementById("summaryStudentNumber"),
    summaryEmail: document.getElementById("summaryEmail"),
    summaryMobileNumber: document.getElementById("summaryMobileNumber"),
    summaryCourse: document.getElementById("summaryCourse")
  };

  function setFieldError(field, errorElement, message) {
    if (!field || !errorElement) {
      return;
    }

    if (message) {
      errorElement.textContent = message;
      field.setAttribute("aria-invalid", "true");
    } else {
      errorElement.textContent = "";
      field.setAttribute("aria-invalid", "false");
    }
  }

  function clearAllErrors() {
    setFieldError(els.fullName, els.fullNameError, "");
    setFieldError(els.studentNumber, els.studentNumberError, "");
    setFieldError(els.email, els.emailError, "");
    setFieldError(els.mobileNumber, els.mobileNumberError, "");
    setFieldError(els.password, els.passwordError, "");
    setFieldError(els.confirmPassword, els.confirmPasswordError, "");
    setFieldError(els.course, els.courseError, "");
    setFieldError(els.terms, els.termsError, "");
  }

  function clearSuccess() {
    if (els.successMessage) {
      els.successMessage.textContent = "";
      els.successMessage.hidden = true;
    }

    if (els.registrationSummary) {
      els.registrationSummary.hidden = true;
    }

    if (els.summaryName) {
      els.summaryName.textContent = "";
    }

    if (els.summaryStudentNumber) {
      els.summaryStudentNumber.textContent = "";
    }

    if (els.summaryEmail) {
      els.summaryEmail.textContent = "";
    }

    if (els.summaryMobileNumber) {
      els.summaryMobileNumber.textContent = "";
    }

    if (els.summaryCourse) {
      els.summaryCourse.textContent = "";
    }
  }

  function clearAllFeedbackAndOutput() {
    clearAllErrors();

    if (els.passwordFeedback) {
      els.passwordFeedback.textContent = "";
    }

    clearSuccess();
  }

  function validateFullName() {
    const value = els.fullName.value.trim();
    let message = "";

    if (!value) {
      message = "Full name is required.";
    } else if (value.length < 2) {
      message = "Full name must be at least 2 characters.";
    }

    setFieldError(els.fullName, els.fullNameError, message);
    return !message;
  }

  function validateStudentNumber() {
    const value = els.studentNumber.value.trim();
    let message = "";

    if (!value) {
      message = "Student number is required.";
    } else if (!isValidStudentNumber(value)) {
      message = "Enter a student number in the format 24-1234-123.";
    }

    setFieldError(els.studentNumber, els.studentNumberError, message);
    return !message;
  }

  function validateEmail() {
    const value = els.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let message = "";

    if (!value) {
      message = "Email address is required.";
    } else if (!emailPattern.test(value)) {
      message = "Enter a valid email address, such as name@example.com.";
    }

    setFieldError(els.email, els.emailError, message);
    return !message;
  }

  function validateMobileNumber() {
    const value = els.mobileNumber.value.trim();
    const mobilePattern = /^(09\d{9}|\+639\d{9})$/;
    let message = "";

    if (!value) {
      message = "Mobile number is required.";
    } else if (!mobilePattern.test(value)) {
      message = "Enter a mobile number in the format 09171234567 or +639171234567.";
    }

    setFieldError(els.mobileNumber, els.mobileNumberError, message);
    return !message;
  }

  function validatePassword() {
    const value = els.password.value;
    let message = "";

    if (!value) {
      message = "Password is required.";
    } else if (!isValidPassword(value)) {
      message =
        "Password must be at least 8 characters, include an uppercase letter, a digit, and one of @, $, or !, with no spaces.";
    }

    setFieldError(els.password, els.passwordError, message);
    return !message;
  }

  function validateConfirmPassword() {
    const value = els.confirmPassword.value;
    let message = "";

    if (!value) {
      message = "Please confirm your password.";
    } else if (value !== els.password.value) {
      message = "Passwords do not match.";
    }

    setFieldError(els.confirmPassword, els.confirmPasswordError, message);
    return !message;
  }

  function validateCourse() {
    const value = els.course.value;
    let message = "";

    if (value !== "BSIT" && value !== "BSCS") {
      message = "Select a valid course (BSIT or BSCS).";
    }

    setFieldError(els.course, els.courseError, message);
    return !message;
  }

  function validateTerms() {
    let message = "";

    if (!els.terms.checked) {
      message = "You must agree to the terms.";
    }

    setFieldError(els.terms, els.termsError, message);
    return !message;
  }

  function updatePasswordFeedback() {
    const value = els.password.value;

    if (!value) {
      els.passwordFeedback.textContent =
        "Use at least 8 characters, one uppercase letter, one digit, and one of @, $, or !. No spaces.";
      return;
    }

    if (isValidPassword(value)) {
      els.passwordFeedback.textContent = "Password meets the requirements.";
    } else {
      els.passwordFeedback.textContent =
        "Password must be at least 8 characters, include an uppercase letter, a digit, and one of @, $, or !, with no spaces.";
    }
  }

  function showSuccess() {
    els.successMessage.textContent =
      "Registration details validated successfully!";
    els.successMessage.hidden = false;

    els.summaryName.textContent = els.fullName.value.trim();
    els.summaryStudentNumber.textContent = els.studentNumber.value.trim();
    els.summaryEmail.textContent = els.email.value.trim();
    els.summaryMobileNumber.textContent = els.mobileNumber.value.trim();
    els.summaryCourse.textContent = els.course.value;

    els.registrationSummary.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const results = [
      validateFullName(),
      validateStudentNumber(),
      validateEmail(),
      validateMobileNumber(),
      validatePassword(),
      validateConfirmPassword(),
      validateCourse(),
      validateTerms()
    ];

    if (results.every(Boolean)) {
      showSuccess();
    } else {
      clearSuccess();
    }
  });

  els.password.addEventListener("input", function () {
    updatePasswordFeedback();

    if (els.passwordError.textContent) {
      validatePassword();
    }

    if (els.confirmPassword.value) {
      validateConfirmPassword();
    }
  });

  els.fullName.addEventListener("blur", validateFullName);

  els.course.addEventListener("change", validateCourse);
  els.terms.addEventListener("change", validateTerms);

  els.fullName.addEventListener("input", function () {
    if (els.fullNameError.textContent) {
      validateFullName();
    }
  });

  els.studentNumber.addEventListener("input", function () {
    if (els.studentNumberError.textContent) {
      validateStudentNumber();
    }
  });

  els.email.addEventListener("input", function () {
    if (els.emailError.textContent) {
      validateEmail();
    }
  });

  els.mobileNumber.addEventListener("input", function () {
    if (els.mobileNumberError.textContent) {
      validateMobileNumber();
    }
  });

  els.confirmPassword.addEventListener("input", function () {
    if (els.confirmPasswordError.textContent) {
      validateConfirmPassword();
    }
  });

  form.addEventListener("reset", function (event) {
    event.preventDefault();
    form.reset();
    clearAllFeedbackAndOutput();
  });
}