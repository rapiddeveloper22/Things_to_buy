const getContract = async(web3) => {
    const tBuy = await $.getJSON('./Things.json');


    const netId = await web3.eth.net.getId();
 
    const deployedNetwork = tBuy.networks[netId];
    const toBuy = new web3.eth.Contract(
        tBuy.abi,
        deployedNetwork && deployedNetwork.address
    );
    
    return toBuy;
};

var deletee = (buy, contract, accounts) => {
    let te;


    $('#del').on("change", (e) => {
        te = e.target.value;
    });


    $('#dele').on("click", async (e) => {
        e.preventDefault();

        await contract.methods.removeItems(te).send({from : accounts[0]});
        totalLoad(buy, contract, accounts);
    });
};

var add = (buy, contract, accounts) => {
    let thi;

    $('#name').on("change", (e) => {
        thi = e.target.value;
    });


    $('#btn').on("click", async (e) => {
        e.preventDefault();
        document.getElementById("name").value = "";
        await contract.methods.enterItems(thi).send({from : accounts[0]});
        totalLoad(buy, contract, accounts);
    });
};

var rettr = (buy, contract, accounts) => {
    let r;

    $('#ret').on("change", (e) => {
        r = e.target.value;
    });
    

    $('#retr').on("click", async (e) => {
   
        e.preventDefault();

        var ans = await contract.methods.retreive(r).call();
        totalLoad(buy, contract, accounts);
    });
};

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Must install MetaMask");
      }
    });
  });
  
};

const totalLoad = async(buy, contract, accounts) => {
	$('#toBuyTable tbody').empty();
	var total = await contract.methods.gettot().call();

	for(var i = 1;i<=total;i++)
	{
		var element = await contract.methods.retreive(i).call();
		
		$('#toBuyTable').append('<tr><td class="tobe">'+i+'</td><td class="tobe">'+element[0]+'</td><td><input type="checkbox"></td></tr>');
		
	}
	console.log(total);
	var rowCount = $('#toBuyTable tbody tr').length;
	console.log(rowCount);

	if(rowCount !== 0) {
		$("#no").remove();
		$("#div").css('display', 'block');
	}
	else if(rowCount === 0) {
		$("#noItem").append('<p class="p-3 text-center lead" id="no">No items added</p>')
		$("#div").css('display', 'none');	
	}

};

var toggle = () => {
	var lo = 0;
	$('input[type=checkbox]').each(function () {
		if (this.checked) {
			let ind = lo+1;
			$("#toBuyTable tr").eq(ind).find('td').eq(0).css('text-decoration','line-through');
			$("#toBuyTable tr").eq(ind).find('td').eq(1).css('text-decoration','line-through');
		}
		else {
			let ind = lo+1;
			$("#toBuyTable tr").eq(ind).find('td').eq(0).css('text-decoration','none');
			$("#toBuyTable tr").eq(ind).find('td').eq(1).css('text-decoration','none');
		}
		lo++;
	});
};



async function app() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContract(web3);
    let buy;
    add(buy, contract, accounts);
    rettr(buy, contract, accounts);
    deletee(buy, contract, accounts);
    totalLoad(buy, contract, accounts);
    toggle();
}
app();


