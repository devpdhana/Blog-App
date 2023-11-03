class One{

    public static void main(String[] args){
        int x = 121;
        int reverseNum = 0;
        while(x > 0){
            int lastDigit = x % 10;
            reverseNum = lastDigit + (reverseNum*10);
            x = x / 10;
        }
        if (x == reverseNum){
            System.out.println(reverseNum);
        }else {
            System.out.println(reverseNum);
        }
    }
}