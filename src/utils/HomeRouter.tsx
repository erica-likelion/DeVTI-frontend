import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRooms, type RoomErrorResponse } from '@/services/room';

export default function HomeRouter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserRooms = async () => {
            try {
                const response = await getMyRooms();
                
                // 참여중인 매칭룸이 있으면 /home으로, 없으면 /home/none으로
                if (response.data.length > 0) {
                    navigate('/home', { replace: true });
                } else {
                    navigate('/home/none', { replace: true });
                }
            } catch (error) {
                const roomError = error as RoomErrorResponse;
                console.error('Failed to get user rooms:', roomError);
                
                // 에러 발생시 기본적으로 /home/none으로
                navigate('/home/none', { replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        checkUserRooms();
    }, [navigate]);

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <p>로딩 중...</p>
            </div>
        );
    }

    return null;
}