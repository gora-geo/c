Validator = {
    // счетчик ошибок
    problemCounter: 0,
    
    validateElement: function(elementId, value) {
        return Rules[elementId].method(this.removeSpaces(value));
    },
    
    
    validateCardNumber: function (number)
    {
        var pattern = new RegExp("^[0-9]{12,19}$");

        var result = pattern.test(number);

        if(result && Validator.isValidLuhn(number)) {
            return true;
        }

        return false;
    },
    
    validateCardholder: function (name) {
        var pattern = new RegExp("^(\\w| |-|\\.|')+$");

        if (pattern.test(name)) {;
            return true;
        }

        return false;
    },
    
    validateMonth: function (m) {
        if(m !== "") {
            var month = parseInt(m);
            if (month >= 1 && month <= 12) {
                return true;
            }
        }

        return false; 
    },
    
    validateYear: function (y) {
        var year = parseInt(y);
        var period = 20;
        
        if (!isNaN(year)) {
            var now = new Date();
            
            if(year + 2000 >= now.getFullYear() && year + 2000 <= now.getFullYear() + period) {
                return true;
            }
        }

        return false; 
    },
    
    validateCvc: function (cvc) {
        var pattern = new RegExp("^[0-9]{3,4}$");

        if (pattern.test(cvc)) {
            return true;
        }

        return false;
    },
    
    validateEmail: function (email) {
        var re = /^([a-zA-Z0-9_\.\-])+@[^.@\s]+(\.[^.@\s]+)+$/;
	return re.test(email);
    },
    
    validatePhone: function (phone) {
        if(phone !== "") {
            return true;
        }
        return false;
    },
    
        // проверяем указанные баллы Спасибо
    validatePoints: function (points, min, max) {
        var pattern = new RegExp("^[0-9]+\\.?[0-9]{0,2}$");
        
        if(pattern.test(points)) {
            if(points >= min && points <= max) {
                return true;
            }
        }

        return false;
    },
    
    // проверка по алгоритму Луна
    isValidLuhn: function (number) {
      var digit, n, sum, _i, _len, _ref;
      sum = 0;
      _ref = number.split('').reverse();
      for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
            digit = _ref[n];
            digit = +digit;
            if (n % 2) {
              digit *= 2;
              if (digit < 10) {
                    sum += digit;
              } else {
                    sum += digit - 9;
              }
            } else {
              sum += digit;
            }
      }
      return sum % 10 === 0;

    },

    // проверяем, прошли ли указанные год и месяц
    checkCurrentYear: function (month, year) {
        var date = new Date(); 

        if(year == (date.getFullYear() - 2000)) {
            if(month >= (date.getMonth() + 1)) {
                return true;
            }
        } else {
            return true;
        }
        return false;
    },
    
    removeSpaces: function(str) {
        return str.replace(/\s{1,}/g, '');
    }
};

Rules = {
    Pan: {
        errorId: "cardErr",
        method: Validator.validateCardNumber
    },
    ExpMonth: {
        errorId: "monthErr",
        method: Validator.validateMonth
     },
     ExpYear: {
        errorId: "yearErr",
        method: Validator.validateYear
     },
     CardholderName: {
        errorId: "nameErr",
        method: Validator.validateCardholder
     },
     Cvc2: {
        errorId: "cvc2Err",
        method: Validator.validateCvc
     },
     email: {
        errorId: "emailErr",
        method: Validator.validateEmail
     },
     phone: {
        errorId: "phoneErr",
        method: Validator.validatePhone
     },
     Points: {
        errorId: "pointsErr",
        method: Validator.validatePoints
     },
     textField: {
    	errorId: "textErr",
        method: Validator.validatePhone
     }
};
