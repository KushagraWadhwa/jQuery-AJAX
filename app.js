 //jQuery function to load the script only after document(html,css) is fully loaded
  $( document ).ready(function() {
//Below is the  Facebook Graphic Api with access token which is assigned  to a variable the get user data
    var myFacebookToken = 'EAACEdEose0cBACvqyU2oIjVEhI73V1ZA1nz3k7diniidhj4YWaUDZAbhsZA8ZBAnQc056033TBBHDSRYStP8ridn2mPTQ1lZBtEJIdoyfMj4w4U6AejgSwF4BcSPW89bMDoKZAHUi90HXCj0DI2zzqiSsL1J1h8kRpWzIzAQH3n0epyMZAv5MFrm2KkI7ZC8Y3w6jxG6ZAa2JPAZDZD';
//Below is the function to get the whole details of user
    function myFacebookData(){
//Asynchrnous AJAX to load the portion of the page with out reloading the whole page
        $.ajax({url:'https://graph.facebook.com/me?fields=about,email,birthday,education,work,hometown,relationship_status,name,location,family,posts,id&access_token='+myFacebookToken,
//Things to be done when user access token is not expire and correct
                success : function(response){
                    //Assigning my name to id name
                    $("#name").text(response.name);
                    //validating if the email id is present or not if present assign email to id named email
                    if(response.email!=undefined && response.email!=null)
                    {
                        $("#email").text(response.email);
                    }
                    //Assigning my birth to id named birthday
                    $('#birthday').text(response.birthday);
                    //Assigning my hometown to id named hometown
                    $('#hometown').text(response.hometown.name);
                    //Assigning my educational details to id named education
                    $('#education').text(response.education[1].concentration[0].name);
                    //Assigning my facebook profile picture to id named profileImage with javascript function setAttribute to src
                     var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
                     //Assigning my current work experience details to id named work
                     $('#work').text(response.work[0].employer.name);
                     //Assigning my relationship status to id named relationship
                     $('#Relationship').text(response.relationship_status);
                     //Assigning my educational details  to id named about
                     $('.about').text(response.education[1].concentration[0].name);
                     //Get my family members details using for loop  to itterate and assin them all to id named Family
                      for (var i =0;i<response.family.data.length ; i++) {
                        if (response.family.data.length!=0) {
                            document.getElementById("family").innerHTML +=response.family.data[i].name + " is my "+ response.family.data[i].relationship + "<br/>";
                        }
                        //if no data found, default data should be loaded
                        else{
                            document.getElementById("family").innerHTML="No Family members found";
                        }
                                             }
                    //Alerting if the user get the data 
                     alert('Hey finally you got my details.');
                },


//Things to done when the access token is expired or incorrect
                error: function(error){
                    $(".error").html('<p>The cause error is :'+error.responseJSON.error.message+'</p>')
                }
            }
        );
    }
//Function call to make changes when event is success when clicked on the Click here to fill the gaps button
    $("#facebookBtn").on('click',myFacebookData);
    //displaying hidden class
    $('#dispalyHidden').on('click' ,function (){
                        $('.hiddenData').toggle();
                     });
                  
 //function to reback with original data
$('#backButton').on('click',function(){     $('#name').text('------');
$('#email').text('-------');     $('#birthday').text('--------');
$('#hometown').text('--------');     $('#education').text('-------');
$('.hiddenData').css("display","none");
document.getElementById("profileImage").setAttribute("src","images/download.png"); 
  });
// Function to get the user Facebook posts
function getProfileFeed(){
        $.ajax({url:'https://graph.facebook.com/me?fields=posts&access_token='+myFacebookToken,
            //Things to be done if the event is success
            success: function(response){
                //Alert to notify that they successfully got user FB posts
                alert('Hey you got my Post data');
                //Using for loop to get all user recent posts
                 for (var i = 0; i < response.posts.data.length; i++) {
                            document.getElementById('postSpace').innerHTML += "<div class='postlist'>" + response.posts.data[i].created_time + "<br/>" + response.posts.data[i].story + "</div>"; 
                        }
                    },
                    // Intimation to user that error is occured while getting FB posts
                   error: function(error){
                    $(".error").html('<p>The cause error is :'+error.responseJSON.error.message+'</p>')
                }
                });
            }
            //Functon call to get FB posts
        $('#profileFeedData').on('click',getProfileFeed);
        //Get back or hiding function of post data
        $('#back').on('click',function(){
$('#postSpace').css('display','none');
        });

 });

