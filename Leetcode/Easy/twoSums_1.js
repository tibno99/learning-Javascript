var twoSum = function(nums, target) {
    for ( let i = 0; i < nums.length - 1; i++){
        let y = target - nums[i];
        for ( let j = i + 1; j < nums.length; j++){
            if ( y == nums[j] ){
                
                return [i, j];
            }
        }
    
        }
    }

console.log(twoSum([3, 2, 4], 6));