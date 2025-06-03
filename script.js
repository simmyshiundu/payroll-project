const form = document.getElementById("myForm");
let results = document.getElementById("myResults");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let basicSalary = document.getElementById("myBasicSalary").value;
    let benefits = document.getElementById("myBenefits").value;

    if (basicSalary == "" || benefits == "") {
        results.innerText = "Enter data in ALL the fields.";
    } else {
        // GROSS SALARY FUNCTION
        function calcGrossSalary(basic, benefit) {
            let gross = basic + benefit;
            return gross;
        }

        // NHIF FUNCTION
        function calcNhif(gross) {
            let nhifCr;
            if (gross <= 5999) {
                nhifCr = 150;
            } else if (gross >= 6000 && gross <= 7999) {
                nhifCr = 300;
            } else if (gross >= 8000 && gross <= 11999) {
                nhifCr = 400;
            } else if (gross >= 12000 && gross <= 14999) {
                nhifCr = 500;
            } else if (gross >= 15000 && gross <= 19999) {
                nhifCr = 600;
            } else if (gross >= 20000 && gross <= 24999) {
                nhifCr = 750;
            } else if (gross >= 25000 && gross <= 29999) {
                nhifCr = 850;
            } else if (gross >= 30000 && gross <= 34999) {
                nhifCr = 900;
            } else if (gross >= 35000 && gross <= 39999) {
                nhifCr = 950;
            } else if (gross >= 40000 && gross <= 44999) {
                nhifCr = 1000;
            } else if (gross >= 45000 && gross <= 49999) {
                nhifCr = 1100;
            } else if (gross >= 50000 && gross <= 59999) {
                nhifCr = 1200;
            } else if (gross >= 60000 && gross <= 69999) {
                nhifCr = 1300;
            } else if (gross >= 70000 && gross <= 79999) {
                nhifCr = 1400;
            } else if (gross >= 80000 && gross <= 89999) {
                nhifCr = 1500;
            } else if (gross >= 90000 && gross <= 99999) {
                nhifCr = 1600;
            } else {
                nhifCr = 1700;
            }
            return nhifCr;
        }

        // NSSF FUNCTION
        function calcNssf(gross) {
            let nssfR = 0.06 * gross;
            return nssfR;
        }

        // NHDF FUNCTION
        function calcNhd(gross) {
            let nhdf_p = 0.015 * gross;
            return nhdf_p;
        }

        // TAXABLE INCOME FUNCTION
        function calcTaxableIncome(gross, nssf, nhdf, nhif) {
            let taxInc = gross - (nssf + nhdf + nhif);
            return taxInc;
        }

        // PAYE TAX FUNCTION
        function calcPaye(taxInc) {
            let payeOutput;
            if (taxInc <= 24000) {
                payeOutput = 0.1 * taxInc;
            } else if (taxInc > 24000 && taxInc <= 32333) {
                payeOutput = (0.1 * 24000) + (0.25 * (taxInc - 24000));
            } else if (taxInc > 32333 && taxInc <= 500000) {
                payeOutput = (0.1 * 24000) + (0.25 * 8333) + (0.3 * (taxInc - 32333));
            } else if (taxInc > 500000 && taxInc <= 800000) {
                payeOutput = (0.1 * 24000) + (0.25 * 8333) + (0.3 * 467667) + (0.325 * (taxInc - 500000));
            } else {
                payeOutput = (0.1 * 24000) + (0.25 * 8333) + (0.3 * 467667) + (0.325 * 300000) + (0.35 * (taxInc - 800000));
            }
            return payeOutput;
        }

        // NET SALARY FUNCTION
        function calcNetSalary(gross, nhif, nhdf, nssf, payeP) {
            let netS = gross - (nhif + nhdf + nssf + payeP);
            return netS;
        }

        basicSalary = parseFloat(basicSalary);
        benefits = parseFloat(benefits);

        let grossSalary = calcGrossSalary(basicSalary, benefits);
        document.getElementById("myGrossSalary").innerHTML = grossSalary.toLocaleString();

        let nhifConRate = calcNhif(grossSalary);
        document.getElementById("myNhif").innerHTML = nhifConRate.toLocaleString();

        let nssfRate = calcNssf(grossSalary);
        document.getElementById("myNssf").innerHTML = nssfRate.toLocaleString();
        
        let nhdfV = calcNhd(grossSalary);
        document.getElementById("myNhdf").innerHTML = nhdfV.toLocaleString();

        let taxableIncome = calcTaxableIncome(grossSalary, nssfRate, nhdfV, nhifConRate);
        let paye = calcPaye(taxableIncome);
        document.getElementById("myPaye").innerHTML = paye.toLocaleString();

        let netSalary = calcNetSalary(grossSalary, nhifConRate, nhdfV, nssfRate, paye);
        document.getElementById("myNetSalary").innerHTML = netSalary.toLocaleString();
    }
});
