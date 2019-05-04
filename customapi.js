$(document).ready(function () {
  var x;
  var queryURL;
  var emotion;
  var finalgender;
  var finalage;
  var videoIDs=[];
  $('.imagerow').css('visibility', 'hidden');
  $('.video-container').css('opacity', '0');
  
 
  $(".videobutton").on("click", function() {
    $('#mainvideo').css('opacity', '1');
    $('#wrapper').css('opacity', '1');
  
  
  console.log(emotion);
  console.log(finalgender);
  console.log(finalage);

  // location.href = "index2.html";
  playvideo(emotion,finalgender,finalage);
  });

  $(".morevideo").on("click", function() {
    var str=this.src;
  var videoID=str.replace("https://img.youtube.com/vi/", '').replace('/0.jpg', '');
console.log(videoID);
console.log(this);

  displaymainvideo(videoID);
    });

  

  function playvideo(emotion,gender,age){
    console.log(emotion);
    console.log(gender);
    console.log(age);
    var youtubekey="&key=AIzaSyAUxaeEeOPFrQHEjb8ucRbOfKBcYQFmoJ0";
   var  youtubeurl="https://www.googleapis.com/youtube/v3/search?part=snippet";
  var filter="&q="+emotion+"+"+gender+"+"+age+"+celebrity"
    queryURl=youtubeurl+filter+youtubekey;
    console.log("youtube final url"+youtubeurl+filter+youtubekey);
    //  https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apiKey;
    
           console.log("inside playvideo");
             
             $.ajax({
                
                method: "GET",
                url: queryURl,
                key: "AIzaSyAUxaeEeOPFrQHEjb8ucRbOfKBcYQFmoJ0"
        
        
      }).then (function(response){
     console.log(response);
     displaymainvideo(response.items[0].id.videoId);
     for(var i=0;i<5;i++){    
videoIDs.push(response.items[i].id.videoId);
     }
console.log(videoIDs);
displaymorevideo(videoIDs);
        // return response ;
    });
   }
function displaymainvideo(videoID){
  console.log("inside display main video");
 
  var videolink="https://www.youtube.com/embed/"+videoID+"?autoplay=1&mute=1";
  console.log(videolink);
  $("#video").attr("src",videolink);
  
}
 function displaymorevideo(videoIDs)
 {
    console.log(videoIDs);
  $(".morevideo1").attr("src","https://img.youtube.com/vi/"+videoIDs[0]+"/0.jpg");
  $(".morevideo2").attr("src","https://img.youtube.com/vi/"+videoIDs[1]+"/0.jpg");
  $(".morevideo3").attr("src","https://img.youtube.com/vi/"+videoIDs[2]+"/0.jpg");
  $(".morevideo4").attr("src","https://img.youtube.com/vi/"+videoIDs[3]+"/0.jpg");
  $(".morevideo5").attr("src","https://img.youtube.com/vi/"+videoIDs[4]+"/0.jpg");
  $(".play").attr("src","assets/images/redplay.png");

 }

   
 

  $('#controlR').click(function() {
    event.preventDefault();
    $('#content').animate({
      marginLeft: "-=400px"
    }, "fast");
 });

$('#controlL').click(function() {
    event.preventDefault();
    $('#content').animate({
      marginLeft: "+=400px"
    }, "fast");
});

$(".target" ).click(function() {
  var id=this.id;
  console.log(id);
  var ele="$(#"+id+")";
  console.log(id);
  console.log(ele);
  imageurl=$(this).attr("src");
 

  console.log(imageurl);
   detect(imageurl);
 });

//  function buildQueryURL() {
//   // queryURL is the url we'll use to query the API
//   var queryURL = "";

//   // Begin building an object to contain our API call's query parameters
//   // Set the API key
//   var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

//   // Grab text the user typed into the search input, add to the queryParams object
//   queryParams.q = $("#search-term")
//     .val()
//     .trim();


//   // Logging the URL so we have access to it for troubleshooting
//   console.log("---------------\nURL: " + queryURL + "\n---------------");
//   console.log(queryURL + $.param(queryParams));
//   return queryURL + $.param(queryParams);
// }

 function detect(){
  img_URL=$("#search-term").val();
  console.log("image"+img_URL);
  console.log(img_URL);
  queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=T58NXq8bmLhg7Szt9i_TT2POiN-YE_A0&api_secret=tDmaCtP_71ZtClEXw2dvxQL9Q8eGfgiW&image_url=" + img_URL + "&return_attributes=gender,age,emotion";
    

      // url: queryURL,
    
    // "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX140_CR0,0,140,209_AL_.jpg"
  // img_URL="http://www.media2.hw-static.com/wp-content/uploads/59131789.jpg"
 $.ajax({
   url: "https://mighty-brook-95893.herokuapp.com/cors",
   method: "POST",
   data: {
     method: "POST",
     url: queryURL,
     key: "efd92cf6cc5e7649916c4e73939e6281"
   }
 }).then (function(response){
  var age = response.faces[0].attributes.age.value;
  var gender=response.faces[0].attributes.gender.value;
  var maxemotion = "na";
  var emotion_value = 0;

  var surprisepercent=response.faces[0].attributes.emotion.surprise;
  if (surprisepercent > emotion_value){
    maxemotion="Surprise" ;
     emotion_value = surprisepercent ;
   };
  var angerpercent=response.faces[0].attributes.emotion.anger;
  if (angerpercent > emotion_value){
   maxemotion="Anger" ;
    emotion_value = angerpercent ;
  };
  var disgustpercent=response.faces[0].attributes.emotion.disgust;
  if (disgustpercent > emotion_value){
   maxemotion="Disgust" ;
    emotion_value = disgustpercent ;
  };
  var fearpercent=response.faces[0].attributes.emotion.fear;
  if (fearpercent > emotion_value){
   maxemotion="Fear" ;
    emotion_value = fearpercent ;
  };
  var happinesspercent=response.faces[0].attributes.emotion.happiness;
  if (happinesspercent > emotion_value){
   maxemotion="Happiness" ;
    emotion_value = happinesspercent ;
  };
  var neutralpercent=response.faces[0].attributes.emotion.neutral;
  if (neutralpercent > emotion_value){
   maxemotion="Neutral" ;
    emotion_value = neutralpercent ;
  };
  var sadnesspercent=response.faces[0].attributes.emotion.sadness;
  if (sadnesspercent > emotion_value){
   maxemotion="Neutral" ;
    emotion_value = sadnesspercent ;
  };

emotion=maxemotion;
finalgender=gender;
finalage=age;


  $("#agevalue").empty();
  $("#agevalue").text(age);

  $("#gendervalue").empty();
  $("#gendervalue").text(gender);

  $("#emotionvalue").empty();
  $("#emotionvalue").text(maxemotion);
  //  displayfaceresult(this);
   $("#image").attr("src",img_URL);
 console.log(response);
//  console.log(response.faces[0].attributes.age.value);
//  console.log(response.faces[0].attributes.gender.value);
//  console.log(response.faces[0].attributes.emotion.anger);
//  console.log(response.faces[0].attributes.emotion.sadness);
//  console.log(response.faces[0].attributes.emotion.neutral);
//  console.log(response.faces[0].attributes.emotion.disgust);
//  console.log(response.faces[0].attributes.emotion.surprise);
//  console.log(response.faces[0].attributes.emotion.fear);
//  console.log(response.faces[0].attributes.emotion.happiness);
 
 
displaychart(surprisepercent,angerpercent,disgustpercent,fearpercent,happinesspercent,neutralpercent,sadnesspercent);
 
 
 });

}
// https://img.youtube.com/vi/eROWK2LzVUU/0.jpg
// function displayfaceresult(result)
// {
//   console.log("insidefaceresult");
//   console.log(result);
//   // console.log(img_URL);

 
//assets/images/redplay.png
     


// }

function clear() {
  $("#image").attr("src","#");
  $("#agevalue").text("");
  $("#gendervalue").text("");
  $("#emotionvalue").text("");
  $("#search-term").val("");
  $("#video").attr("src","#");
  $(".morevideo").attr("src","#");
  $(".play").attr("src","#");
  $('.imagerow').css('visibility', 'hidden');
  $('.video-container').css('opacity', '0');
  $()
} 
$("#clear-all").on("click", clear);
$("#run-search").on("click", function(event) {
  //similar to NYT search class activity
  
  event.preventDefault();

  // Empty the region associated with the articles
  // clear();
  $('.imagerow').css('visibility', 'visible');
  $('.video-container').css('opacity', '1');
  $('#mainvideo').css('opacity', '0');
  $('#wrapper').css('opacity', '0');
  // Build the query URL for the ajax request to the NYT API
  // var queryURL = buildQueryURL();
  detect();

});

// var age;
// var gender;
// var angerpercent=response.faces[0].attributes.emotion.anger;
// var disgustpercent=response.faces[0].attributes.emotion.disgust;
// var fearpercent=response.faces[0].attributes.emotion.fear;
// var happinesspercent=response.faces[0].attributes.emotion.happiness;
// var neutralpercent=response.faces[0].attributes.emotion.neutral;
// var sadnesspercent=response.faces[0].attributes.emotion.sadness;
// var surprisepercent=response.faces[0].attributes.emotion.surpise;

am4core.ready(function() {
        
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.data = [
      {
        emotion: "Anger",
        percent: 0.378
      },
      {
        emotion: "Czech Republic",
        percent: 75.48
      },
      {
        emotion: "Disgust",
        percent: 0.004
      },
      {
        emotion: "Anger",
        percent: 0.004
      },
      {
        emotion: "Surprise",
        percent: 23.765
      },
      {
        emotion: "Fear",
        percent: 0.004
      },
      {
        emotion: "Happiness",
        percent: 0.363
      }
    ];
    
    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;
    
    chart.legend = new am4charts.Legend();
    
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "percent";
    series.dataFields.depthValue = "percent";
    series.dataFields.category = "emotion";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
    pieSeries.labels.template.text = "{emotion: {percent.value}";
    }); // end am4core.ready()

  function displaychart(surprisepercent,angerpercent,disgustpercent,fearpercent,happinesspercent,neutralpercent,sadnesspercent) {
    console.log("displaychart");
      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
          text: "How you doin?"
        },
        legend: {
          maxWidth: 350,
          itemWidth: 120
        },
        data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{indexLabel}",
          dataPoints: [
            { y: surprisepercent, indexLabel: "Surprise" },
            { y: angerpercent, indexLabel: "Anger" },
            { y: disgustpercent, indexLabel: "Disgust" },
            { y: fearpercent, indexLabel: "Fear"},
            { y: happinesspercent, indexLabel: "Happiness" },
            { y: neutralpercent, indexLabel: "Neutral"},
            { y: sadnesspercent, indexLabel: "Sad"}
          ]
        }
        ]
      });
      chart.render();
    }



});