let activeGenerator = 2, activeTheme = 0;
    const nums = [0, 0, 0, 0];
    const pastNums = [];
    const themes = ["style1.css", "style2.css", "style3.css"];
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    async function playTick()
    {
        var tick = new Audio("Sounds/click 1.wav");
        tick.play();
    }
    async function playBell()
    {
        var tick = new Audio("Sounds/bell 1.mp3");
        tick.play();
    }
    async function generate(i)
    {
      if (pastNums.length > 7) pastNums.fill(-1);
      console.log("Past nums: ", pastNums);
      valMin = parseInt(document.getElementById("gen" + i).getElementsByClassName("generatorMin")[0].value);
      valMax = parseInt(document.getElementById("gen" + i).getElementsByClassName("generatorMax")[0].value);
      //console.log(valMin, valMax);
      let x = 0;
      while (true)
      {
        x++;
        if(x > 20)
        {
          pastNums.fill(-1);
          break;
        }
        found = false;
        num = generateRandom(valMin, valMax);
        pastNums.forEach(i => {
          (i in pastNums)
          {
            if(i == num) found = true;
          }
        }); 
        if(!found) break;
      }
      nums[i] = num;
      pastNums.push(num);
      n = Math.floor(Math.random() * (8) + 15);
      waitTimer = 5;

      for(let y = 0; y < n; y++)
      {
        document.getElementById("gen" + i).getElementsByClassName("generatorNum")[0].innerHTML = Math.floor(Math.random() * (valMax + 1 - valMin) + valMin);
        playTick();
        await sleep(waitTimer);
        waitTimer += 15;
      }
      document.getElementById("gen" + i).getElementsByClassName("generatorNum")[0].innerHTML = nums[i];
      playBell();
    }
    function addGenerator()
    {
      if(activeGenerator < 4)
      {
        activeGenerator++;
        console.log("gen" + activeGenerator);
        document.getElementById("gen" + activeGenerator).style.display = "block";
      }
    }
    function removeGenerator()
    {
      if(activeGenerator > 0)
      {
        document.getElementById("gen" + activeGenerator).style.display = "none";
        console.log("gen" + activeGenerator);
        activeGenerator--;
      }
    }
    function changeTheme()
    {
      activeTheme++;
      if(activeTheme >= themes.length) activeTheme = 0;
      var oldlink = document.getElementsByTagName("link").item(0);
      var newlink = oldlink;
      newlink.setAttribute("href", themes[activeTheme]);

      document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    }
    function generateRandom(min, max) {
      const array = new Uint16Array(1);
      self.crypto.getRandomValues(array);
      console.log(array[0]);
      rng = Math.floor((array[0] / 65536) * (max + 1 - min) + min);
      console.log(rng);
      return rng;
    }